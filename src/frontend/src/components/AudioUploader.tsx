import { uploadAudioFile } from '../lib/api';

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
    <label style={{ cursor: 'pointer' }}>
      <input type="file" accept="audio/*" onChange={onFileChange} style={{ display: 'none' }} />
      Upload
    </label>
  );
}
