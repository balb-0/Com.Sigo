import express from 'express';
import { embedText } from '../../services/embedding.service';
import { semanticSearch } from '../../repositories/chamadaSegments.repository';

export const searchRouter = express.Router();

// GET /api/v1/search?q=...&speaker_tag=2&limit=20&chamada_id=123
searchRouter.get('/', async (req, res) => {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) return res.status(400).json({ error: 'q is required' });
    const speakerTag = req.query.speaker_tag ? Number(req.query.speaker_tag) : null;
    const chamadaId = req.query.chamada_id ? Number(req.query.chamada_id) : null;
    const limit = req.query.limit ? Math.min(Number(req.query.limit), 100) : 20;
    const minSimilarity = req.query.min_similarity ? Number(req.query.min_similarity) : undefined;

    const embedding = await embedText(q);
    const results = await semanticSearch(embedding, { limit, speakerTag, chamadaId, minSimilarity });
    return res.json({ q, count: results.length, results });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'internal_error' });
  }
});
