import { uploadAudioFile } from "../../lib/api";
import "./AudioUploader.css";

export function AudioUploader({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { url } = await uploadAudioFile(file);
      onUploaded(url);
    }
    e.currentTarget.value = "";
  }

  return (
    <label className="audio-uploader-label">
      <input
        type="file"
        accept="audio/*"
        onChange={onFileChange}
        className="audio-uploader-input"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M74.34,85.66A8,8,0,0,1,85.66,74.34L120,108.69V24a8,8,0,0,1,16,0v84.69l34.34-34.35a8,8,0,0,1,11.32,11.32l-48,48a8,8,0,0,1-11.32,0ZM240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H80a8,8,0,0,1,0,16H32v64H224V136H176a8,8,0,0,1,0-16h48A16,16,0,0,1,240,136Zm-40,32a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z"></path>
      </svg>
    </label>
  );
}
