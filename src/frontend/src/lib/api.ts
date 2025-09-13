const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function uploadAudioFile(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/v1/upload/audio`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}
