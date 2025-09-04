import { getDb } from '../config/db';

type ChamadaRow = {
  chamada_id: number;
  created_at: string;
  cliente_id: string | null;
  atendente_id: string | null;
  avaliacao_json: unknown | null;
  nota_qualidade: number | null;
  transcript_json: unknown | null;
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
  };
}

async function list(): Promise<ChamadaRow[]> {
  const db = getDb();
  const { rows } = await db.query('select * from chamada order by chamada_id desc limit 100');
  return rows.map(mapRow);
}

async function getById(id: number): Promise<ChamadaRow | null> {
  const db = getDb();
  const { rows } = await db.query('select * from chamada where chamada_id = $1', [id]);
  return rows[0] ? mapRow(rows[0]) : null;
}

export const chamadaRepository = { list, getById };
