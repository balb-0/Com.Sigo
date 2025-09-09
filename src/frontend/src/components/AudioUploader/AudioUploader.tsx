import { uploadAudioFile } from '../../lib/api';
import './AudioUploader.css';

export function AudioUploader({ onUploaded }: { onUploaded: (url: string) => void }) {
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { url } = await uploadAudioFile(file);
      onUploaded(url);
    }
    e.currentTarget.value = '';
  }

  return (
    <label className="audio-uploader-label">
      <input type="file" accept="audio/*" onChange={onFileChange} className="audio-uploader-input" />
      Upload
    </label>
  );
}
