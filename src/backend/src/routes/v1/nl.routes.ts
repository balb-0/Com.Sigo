import { Router } from 'express';
import { parseFiltersFromTextPTBR } from '../../services/nl.service';

export const nlRouter = Router();

nlRouter.post('/filters', async (req, res) => {
  try {
    const { text } = req.body as { text?: string };
    if (!text || !text.trim()) return res.status(400).json({ error: 'Missing text' });
    const result = await parseFiltersFromTextPTBR(text.trim());
    if (!result) return res.status(422).json({ error: 'Unable to parse' });
    res.json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json({ error: 'NL parsing failed' });
  }
});
