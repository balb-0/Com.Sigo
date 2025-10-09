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

export async function createChamada(jsonData: unknown): Promise<ChamadaResponse> {
  return fetchJson(`${API_BASE}/v1/chamadas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
    timeoutMs: 10000,
  });
}

export async function transcribeAudioByUrl(url: string): Promise<{ text: string }> {
  return fetchJson(`${API_BASE}/v1/transcribe/audio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
    timeoutMs: 60000,
  });
}

export type DashboardQuery = {
  filter?: 'all' | 'thisWeek' | 'thisMonth' | 'today' | 'custom';
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  minScore?: number;
  maxScore?: number;
  tag?: string;
};

export async function parseFiltersWithAI(text: string): Promise<{ params: DashboardQuery; summary: string }> {
  return fetchJson(`${API_BASE}/v1/nl/filters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
    timeoutMs: 20000,
  });
}

export async function agentInterpret(message: string): Promise<{ reply: string; filters: any; preview: { count: number; items: any[] } }> {
  return fetchJson(`${API_BASE}/v1/agent/interpret`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
    timeoutMs: 20000,
  });
}

export async function previewFilters(body: { dateRange?: { from: string; to: string }; speaker?: 'cliente'|'agente'|'any'; semantic?: string; status?: string[] }): Promise<{ count: number; ids: number[] }> {
  return fetchJson(`${API_BASE}/v1/chamadas/filters/preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    timeoutMs: 20000,
  });
}
