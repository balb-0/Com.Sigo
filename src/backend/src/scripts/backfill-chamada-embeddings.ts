import { getDb } from "../config/db";
import { embedText } from "../services/embedding.service";
import { insertSegments } from "../repositories/chamadaSegments.repository";

type Word = { word: string; startTime?: string; endTime?: string; speakerTag?: number };

function msFromS(s?: string): number | null {
  if (!s) return null;
  const m = s.match(/([0-9]+\.?[0-9]*)s/);
  if (!m) return null;
  const sec = parseFloat(m[1]);
  return Math.round(sec * 1000);
}

function normalizeSpeakerTag(tag: number | undefined): number {
  // fallback: treat undefined as 0, but we prefer explicit 1/2
  if (!tag) return 0;
  return tag;
}

function chunkBySpeaker(words: Word[], maxChars = 500): Array<{ text: string; speaker_tag: number; start: number | null; end: number | null }> {
  const chunks: Array<{ text: string; speaker_tag: number; start: number | null; end: number | null }> = [];
  let current: { text: string[]; speaker_tag: number; start: number | null; end: number | null } | null = null;
  for (const w of words) {
    const tag = normalizeSpeakerTag(w.speakerTag);
    const start = msFromS(w.startTime);
    const end = msFromS(w.endTime);
    if (!current || current.speaker_tag !== tag || (current.text.join(" ").length + (w.word?.length || 0) + 1) > maxChars) {
      if (current && current.text.length) {
        chunks.push({ text: current.text.join(" "), speaker_tag: current.speaker_tag, start: current.start, end: current.end });
      }
      current = { text: [], speaker_tag: tag, start, end };
    }
    current.text.push(w.word);
    current.end = end ?? current.end;
    if (current.start == null) current.start = start;
  }
  if (current && current.text.length) {
    chunks.push({ text: current.text.join(" "), speaker_tag: current.speaker_tag, start: current.start, end: current.end });
  }
  return chunks.filter(c => c.text.trim().length > 0);
}

async function safeEmbed(text: string): Promise<number[] | null> {
  try {
    return await embedText(text);
  } catch (e: any) {
    const msg = e?.message || String(e);
    // Skip bad payloads (400) and continue
    if (/\b400\b/.test(msg) || /Bad Request/i.test(msg)) {
      // eslint-disable-next-line no-console
      console.warn("Skipping segment due to 400 from embeddings API:", msg);
      return null;
    }
    // basic retry once for transient
    await new Promise(r => setTimeout(r, 500));
    try { return await embedText(text); } catch { return null; }
  }
}

async function backfillOne(chamadaId: number, rawTranscript: any) {
  const db = getDb();
  // Skip chamadas that already have segments unless forced
  const { rows: already } = await db.query("SELECT COUNT(1) AS n FROM chamada_segments WHERE chamada_id = $1", [chamadaId]);
  const countExisting = Number(already?.[0]?.n || 0);
  const forceAll = process.env.BACKFILL_FORCE === '1';
  if (!forceAll && countExisting > 0) {
    // eslint-disable-next-line no-console
    console.log(`Skip chamada ${chamadaId} (already has ${countExisting} segment(s))`);
    return;
  }

  // Flatten all results[*].alternatives[0].words
  // Flatten all results[*].alternatives[0].words
  const words: Word[] = [];
  let transcript = rawTranscript;
  if (typeof transcript === 'string') {
    try { transcript = JSON.parse(transcript); } catch { /* ignore */ }
  }
  const results = Array.isArray(transcript?.results) ? transcript.results : [];
  for (const r of results) {
    const alt0 = r?.alternatives?.[0];
    if (alt0?.words && Array.isArray(alt0.words)) {
      for (const w of alt0.words) words.push(w);
    }
  }
  if (!Array.isArray(words) || words.length === 0) return;
  const chunks = chunkBySpeaker(words);
  const segmentsToInsert: any[] = [];
  for (const c of chunks) {
    const embedding = await safeEmbed(c.text);
    segmentsToInsert.push({
      chamada_id: chamadaId,
      speaker_tag: c.speaker_tag,
      start_time_ms: c.start ?? null,
      end_time_ms: c.end ?? null,
      text: c.text,
      embedding: embedding ?? undefined,
    });
  }
  const valid = segmentsToInsert.filter(s => Array.isArray(s.embedding));
  if (valid.length > 0) {
    await insertSegments(valid);
  } else {
    // eslint-disable-next-line no-console
    console.warn(`No valid segments to insert for chamada ${chamadaId}`);
  }
}

async function main() {
  const db = getDb();
  const onlyEmpty = process.env.BACKFILL_ONLY_EMPTY === '1';
  const sql = onlyEmpty
    ? `SELECT c.chamada_id, c.transcript_json
       FROM chamada c
       LEFT JOIN (
         SELECT chamada_id, COUNT(1) n FROM chamada_segments GROUP BY chamada_id
       ) s ON s.chamada_id = c.chamada_id
       WHERE c.transcript_json IS NOT NULL AND COALESCE(s.n,0) = 0`
    : `SELECT chamada_id, transcript_json FROM chamada WHERE transcript_json IS NOT NULL`;
  const { rows } = await db.query(sql);
  for (const row of rows) {
    const chamadaId = Number(row.chamada_id);
    const transcript = row.transcript_json;
    try {
      await backfillOne(chamadaId, transcript);
      // eslint-disable-next-line no-console
      console.log(`Backfilled chamada ${chamadaId}`);
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(`Failed chamada ${chamadaId}:`, e?.message || e);
    }
  }
  process.exit(0);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
