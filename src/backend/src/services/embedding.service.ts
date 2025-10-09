import crypto from 'crypto';

let openaiClient: any | null = null;

function getClient() {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is required');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const OpenAI = require('openai');
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

const CACHE = new Map<string, number[]>();

export function computeTextHash(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export async function embedText(text: string): Promise<number[]> {
  const normalized = text.trim();
  const key = computeTextHash(normalized);
  const cached = CACHE.get(key);
  if (cached) return cached;

  const client = getClient();
  const model = process.env.OPENAI_EMBEDDING_MODEL?.trim() || 'text-embedding-3-small';
  const res = await client.embeddings.create({ model, input: normalized });
  const vector = res.data?.[0]?.embedding as number[];
  if (!vector || !Array.isArray(vector)) throw new Error('Invalid embedding response');
  CACHE.set(key, vector);
  return vector;
}
