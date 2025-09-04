import { useRef, useState } from 'react';
import { uploadAudioFile } from '../lib/api';

export function AudioRecorder({ onUploaded }: { onUploaded: (url: string) => void }) {
  const [recording, setRecording] = useState<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
      const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'audio/webm' });
      const { url } = await uploadAudioFile(file);
      onUploaded(url);
    };
    recorder.start();
    setRecording(recorder);
  }

  function stopRecording() {
    recording?.stop();
    setRecording(null);
  }

  return recording ? (
    <button onClick={stopRecording} style={{ background: '#ef4444', color: 'white' }}>Stop</button>
  ) : (
    <button onClick={startRecording}>Record</button>
  );
}
