const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function uploadAudioFile(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${API_BASE}/v1/upload/audio`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  return res.json();
}

export type ChamadaResponse = {
  chamada_id: number;
  created_at: string;
  cliente_id?: string | null;
  atendente_id?: string | null;
  avaliacao_json?: unknown | null;
  nota_qualidade: number | null;
  transcript_json?: unknown | null;
};

async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit & { timeoutMs?: number }): Promise<T> {
  const controller = new AbortController();
  const timeoutMs = init?.timeoutMs ?? 10000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...init, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Request failed: ${res.status} ${res.statusText}${text ? ` - ${text}` : ''}`);
    }
    return res.json();
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw err as Error;
  } finally {
    clearTimeout(timeout);
  }
}

export async function listChamadas(): Promise<ChamadaResponse[]> {
  return fetchJson(`${API_BASE}/v1/chamadas`, { timeoutMs: 10000 });
}

export async function createChamada(jsonData: any): Promise<ChamadaResponse> {
  return fetchJson(`${API_BASE}/v1/chamadas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
    timeoutMs: 10000,
  });
}
