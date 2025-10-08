import { getDb } from "../config/db";

export type ChamadaSegmentRow = {
  segment_id: number;
  chamada_id: number;
  speaker_tag: number; // 1=agente, 2=cliente
  start_time_ms: number | null;
  end_time_ms: number | null;
  text: string;
  similarity?: number;
};

export async function insertSegments(
  segments: Array<Omit<ChamadaSegmentRow, "segment_id" | "similarity"> & { embedding?: number[] | null }>
): Promise<void> {
  if (!segments.length) return;
  const db = getDb();
  const tuples: string[] = [];
  const params: any[] = [];
  for (let i = 0; i < segments.length; i++) {
    const base = i * 6;
    tuples.push(`($${base + 1}::int, $${base + 2}::int, $${base + 3}::int, $${base + 4}::int, $${base + 5}::text, $${base + 6}::vector)`);
    const s = segments[i];
    params.push(
      s.chamada_id,
      s.speaker_tag,
      s.start_time_ms ?? null,
      s.end_time_ms ?? null,
      s.text,
      s.embedding ? JSON.stringify(s.embedding) : null
    );
  }
  const sql = `INSERT INTO chamada_segments (chamada_id, speaker_tag, start_time_ms, end_time_ms, text, embedding)
               VALUES ${tuples.join(",")}`;
  await db.query(sql, params);
}

export async function semanticSearch(
  embedding: number[],
  options: { limit?: number; speakerTag?: number | null; chamadaId?: number | null; minSimilarity?: number | null }
): Promise<ChamadaSegmentRow[]> {
  const db = getDb();
  const limit = options.limit ?? 20;
  const conditions: string[] = [];
  const params: any[] = [JSON.stringify(embedding)];
  if (options.speakerTag != null) {
    conditions.push(`speaker_tag = $${params.length + 1}::int`);
    params.push(options.speakerTag);
  }
  if (options.chamadaId != null) {
    conditions.push(`chamada_id = $${params.length + 1}::int`);
    params.push(options.chamadaId);
  }
  if (options.minSimilarity != null) {
    conditions.push(`(1 - (embedding <=> $1::vector)) >= $${params.length + 1}::float`);
    params.push(options.minSimilarity);
  }
  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const { rows } = await db.query(
    `SELECT segment_id, chamada_id, speaker_tag, start_time_ms, end_time_ms, text,
            1 - (embedding <=> $1::vector) AS similarity
     FROM chamada_segments
     ${where}
     ORDER BY embedding <=> $1::vector
     LIMIT $${params.length + 1}::int`,
    [...params, limit]
  );
  return rows.map((r: any) => ({
    segment_id: Number(r.segment_id),
    chamada_id: Number(r.chamada_id),
    speaker_tag: Number(r.speaker_tag),
    start_time_ms: r.start_time_ms ?? null,
    end_time_ms: r.end_time_ms ?? null,
    text: r.text,
    similarity: r.similarity != null ? Number(r.similarity) : undefined,
  }));
}
