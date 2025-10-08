import express from 'express';
import { getDb } from '../../config/db';
import { embedText } from '../../services/embedding.service';

export const chamadasFiltersRouter = express.Router();

// POST /api/v1/chamadas/filters/preview
// Body: { dateRange?: { from:string,to:string }, speaker?: 'cliente'|'agente'|'any', semantic?: string, status?: string[] }
chamadasFiltersRouter.post('/preview', async (req, res) => {
  try {
    const body = req.body || {};
    const db = getDb();

    const clauses: string[] = [];
    const params: any[] = [];

    // Date range (based on chamada.created_at)
    if (body.dateRange?.from && body.dateRange?.to) {
      params.push(body.dateRange.from, body.dateRange.to);
      clauses.push(`c.created_at BETWEEN $${params.length - 1} AND $${params.length}`);
    }

    // Status (if houver no futuro)
    if (Array.isArray(body.status) && body.status.length) {
      // assuming there is a c.status column in future; safe no-op for now
    }

    // Semantic (joins segments)
    let semanticSql = '';
    if (body.semantic && String(body.semantic).trim().length > 0) {
      const embedding = await embedText(String(body.semantic));
      params.push(JSON.stringify(embedding));
      const speakerMap: Record<string, number | null> = { cliente: 2, agente: 1, any: null };
      const speakerTag = speakerMap[String(body.speaker || 'any')];
      semanticSql = `EXISTS (
        SELECT 1 FROM chamada_segments cs
        WHERE cs.chamada_id = c.chamada_id
          ${speakerTag ? `AND cs.speaker_tag = ${speakerTag}` : ''}
        ORDER BY cs.embedding <=> $${params.length}::vector
        LIMIT 1
      )`;
      clauses.push(semanticSql);
    } else if (body.speaker && body.speaker !== 'any') {
      const speakerMap: Record<string, number> = { cliente: 2, agente: 1 };
      const speakerTag = speakerMap[String(body.speaker)];
      if (speakerTag) {
        clauses.push(`EXISTS (SELECT 1 FROM chamada_segments cs WHERE cs.chamada_id = c.chamada_id AND cs.speaker_tag = ${speakerTag})`);
      }
    }

    const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
    const sql = `SELECT c.chamada_id FROM chamada c ${where} LIMIT 200`;
    const { rows } = await db.query(sql, params);
    const ids = rows.map((r: any) => Number(r.chamada_id));
    return res.json({ count: ids.length, ids });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'internal_error' });
  }
});
