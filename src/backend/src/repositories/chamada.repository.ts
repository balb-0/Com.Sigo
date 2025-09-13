import { getDb } from "../config/db";

type ChamadaRow = {
  chamada_id: number;
  created_at: string;
  cliente_id: string | null;
  atendente_id: string | null;
  avaliacao_json: unknown | null;
  nota_qualidade: number | null;
  transcript_json: unknown | null;
  embedding: number[] | null;
};

type CreateChamadaData = {
  cliente_id?: string;
  atendente_id?: string;
  avaliacao_json?: unknown;
  nota_qualidade?: number;
  transcript_json?: unknown;
  embedding?: number[];
};

type SimilaritySearchResult = ChamadaRow & {
  similarity: number;
};

function mapRow(row: any): ChamadaRow {
  return {
    chamada_id: Number(row.chamada_id),
    created_at: row.created_at,
    cliente_id: row.cliente_id ?? null,
    atendente_id: row.atendente_id ?? null,
    avaliacao_json: row.avaliacao_json ?? null,
    nota_qualidade: row.nota_qualidade ?? null,
    transcript_json: row.transcript_json ?? null,
    embedding: row.embedding ? JSON.parse(row.embedding) : null,
  };
}

function mapSimilarityRow(row: any): SimilaritySearchResult {
  return {
    ...mapRow(row),
    similarity: Number(row.similarity),
  };
}

async function list(): Promise<ChamadaRow[]> {
  const db = getDb();
  const { rows } = await db.query(
    "select * from chamada order by chamada_id desc limit 100"
  );
  return rows.map(mapRow);
}

async function getById(id: number): Promise<ChamadaRow | null> {
  const db = getDb();
  const { rows } = await db.query(
    "select * from chamada where chamada_id = $1",
    [id]
  );
  return rows[0] ? mapRow(rows[0]) : null;
}

async function create(data: CreateChamadaData): Promise<ChamadaRow> {
  const db = getDb();
  const { rows } = await db.query(
    `INSERT INTO chamada (cliente_id, atendente_id, avaliacao_json, nota_qualidade, transcript_json, embedding)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.cliente_id || null,
      data.atendente_id || null,
      data.avaliacao_json ? JSON.stringify(data.avaliacao_json) : null,
      data.nota_qualidade || null,
      data.transcript_json ? JSON.stringify(data.transcript_json) : null,
      data.embedding ? JSON.stringify(data.embedding) : null,
    ]
  );
  return mapRow(rows[0]);
}

async function searchSimilar(
  embedding: number[],
  limit: number = 10,
  threshold: number = 0.7
): Promise<SimilaritySearchResult[]> {
  const db = getDb();
  const { rows } = await db.query(
    `SELECT *,
            1 - (embedding <=> $1::vector) as similarity
     FROM chamada
     WHERE embedding IS NOT NULL
       AND 1 - (embedding <=> $1::vector) > $2
     ORDER BY embedding <=> $1::vector
     LIMIT $3`,
    [JSON.stringify(embedding), threshold, limit]
  );
  return rows.map(mapSimilarityRow);
}

async function updateEmbedding(
  chamadaId: number,
  embedding: number[]
): Promise<void> {
  const db = getDb();
  await db.query(
    "UPDATE chamada SET embedding = $1::vector WHERE chamada_id = $2",
    [JSON.stringify(embedding), chamadaId]
  );
}

export const chamadaRepository = {
  list,
  getById,
  create,
  searchSimilar,
  updateEmbedding,
};
