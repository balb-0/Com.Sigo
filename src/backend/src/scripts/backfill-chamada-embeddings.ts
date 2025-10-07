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

async function backfillOne(chamadaId: number, transcript: any) {
  // Flatten all results[*].alternatives[0].words
  const words: Word[] = [];
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
    const embedding = await embedText(c.text);
    segmentsToInsert.push({
      chamada_id: chamadaId,
      speaker_tag: c.speaker_tag,
      start_time_ms: c.start ?? null,
      end_time_ms: c.end ?? null,
      text: c.text,
      embedding,
    });
  }
  await insertSegments(segmentsToInsert);
}

async function main() {
  const db = getDb();
  const { rows } = await db.query("SELECT chamada_id, transcript_json FROM chamada WHERE transcript_json IS NOT NULL");
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
