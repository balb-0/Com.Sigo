import { Router } from 'express';
import { parseFiltersFromTextPTBR } from '../../services/nl.service';

export const nlRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: NL
 *     description: Processamento de linguagem natural para filtros
 */

/**
 * @openapi
 * /v1/nl/filters:
 *   post:
 *     summary: Converte um texto em filtros estruturados
 *     tags: [NL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filtros extraídos
 *       400:
 *         description: Texto ausente
 *       422:
 *         description: Não foi possível extrair filtros
 *       500:
 *         description: Erro de processamento
 */
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
