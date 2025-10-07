import express from 'express';
import { embedText } from '../../services/embedding.service';
import { semanticSearch } from '../../repositories/chamadaSegments.repository';
import { inferIntentPTBR } from '../../services/intent.service';

export const agentRouter = express.Router();

// POST /api/v1/agent/interpret
// Body: { message: string }
agentRouter.post('/interpret', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') return res.status(400).json({ error: 'message is required' });

    const intent = await inferIntentPTBR(message);

    // FALLBACK: se LLM não preencheu dateRange mas mensagem tem "últimos N dias", injeta aqui
    const lower = message.toLowerCase();
    const lastDaysMatch = lower.match(/\b(?:ultim[oa]s?|passad[oa]s?)\s+(\d+)\s+dias?\b/);
    if (lastDaysMatch && !intent.dateRange) {
      const n = Number(lastDaysMatch[1]);
      intent.dateRange = { filter: 'custom', lastDays: n };
      if (intent.kind === 'semantic') intent.kind = 'mixed';
    }
    if (intent.kind === 'chitchat' && intent.assistant) {
      return res.json({ reply: intent.assistant, filters: {}, preview: { count: 0, items: [] } });
    }

    if ((intent.kind === 'semantic' || intent.kind === 'mixed') && intent.semantic) {
      const speaker = intent.semantic.speaker || 'any';
      const speakerTag = speaker === 'cliente' ? 2 : speaker === 'agente' ? 1 : null;
      const semantic = intent.semantic.query;
      const embedding = await embedText(semantic);
      // dynamic threshold: try 0.65, then 0.55 if few results
      const results = await semanticSearch(embedding, { limit: 10, speakerTag });
      const friendly = intent.assistant || (results.length
        ? (speakerTag
            ? `Encontrei ${results.length} trechos em que ${speaker} menciona "${semantic}". Quer ver no Dashboard?`
            : `Encontrei ${results.length} trechos sobre "${semantic}". Quer ver no Dashboard?`)
        : `Não encontrei trechos confiáveis para "${semantic}". Quer tentar outra palavra ou ajustar o período?`);
      return res.json({ reply: friendly, filters: { speaker, semantic, dateRange: intent.dateRange }, preview: { count: results.length, items: results.slice(0, 5) } });
    }

    // Parametric fallback – today/thisWeek/thisMonth/custom
    const p = intent.dateRange || { filter: 'all' };
    const parts: string[] = [];
    if (p.filter === 'today') parts.push('hoje');
    if (p.filter === 'thisWeek') parts.push('esta semana');
    if (p.filter === 'thisMonth') parts.push('este mês');
    if (p.filter === 'custom' && p.from && p.to) parts.push(`entre ${p.from} e ${p.to}`);
    const reply = intent.assistant || (parts.length
      ? `Certo, aplico filtro de período (${parts.join(', ')}). Quer ver no Dashboard?`
      : `Posso aplicar filtros de período (hoje/semana/mês/intervalo) ou buscar por trechos específicos (ex.: cliente disse "gás").`);
    return res.json({ reply, filters: { dateRange: p }, preview: { count: 0, items: [] } });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || 'internal_error' });
  }
});
