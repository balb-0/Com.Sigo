import { useRef, useState } from "react";
import { uploadAudioFile } from "../../lib/api";
import "./AudioRecorder.css";

export function AudioRecorder({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const [recording, setRecording] = useState<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) =>
      e.data.size && chunksRef.current.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const file = new File([blob], `recording-${Date.now()}.webm`, {
        type: "audio/webm",
      });
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
    <button onClick={stopRecording} className="audio-recorder-button recording">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M216,48V208a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H200A16,16,0,0,1,216,48Z"></path>
      </svg>
    </button>
  ) : (
    <button onClick={startRecording} className="audio-recorder-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path>
      </svg>
    </button>
  );
}
