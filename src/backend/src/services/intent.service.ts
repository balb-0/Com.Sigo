let OpenAIClient: any | null = null;
function getClient() {
  if (!OpenAIClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('OPENAI_API_KEY is required');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const OpenAI = require('openai');
    OpenAIClient = new OpenAI({ apiKey });
  }
  return OpenAIClient;
}

export type Intent = {
  kind: 'semantic' | 'parametric' | 'mixed' | 'chitchat';
  semantic?: { query: string; speaker?: 'cliente'|'agente'|'any' };
  dateRange?: { filter?: 'all'|'thisWeek'|'thisMonth'|'today'|'custom'; from?: string; to?: string; lastDays?: number };
  assistant?: string;
};

export async function inferIntentPTBR(message: string): Promise<Intent> {
  // Normalize curly quotes and diacritics
  const normalized = message
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'");
  const ascii = normalized.normalize('NFD').replace(/\p{Diacritic}/gu, '');

  // Fast path: quotes => semantic directly, with speaker heuristic
  const quoted = (normalized.match(/['"][^'\"]+['"]/g) || []).map(s => s.slice(1, -1));
  if (quoted.length) {
    const lower = ascii.toLowerCase();
    const speaker: 'cliente'|'agente'|'any' = lower.includes('cliente') || lower.includes('speaker 2') ? 'cliente' : lower.includes('agente') || lower.includes('speaker 1') ? 'agente' : 'any';
    // also detect dates
    const detectedDate = detectDateRange(ascii);
    if (detectedDate) {
      return { kind: 'mixed', semantic: { query: quoted[0], speaker }, dateRange: detectedDate, assistant: `Ok! Vou procurar por "${quoted[0]}"${speaker !== 'any' ? ` em falas do ${speaker}` : ''}${humanizeDate(detectedDate)}.` };
    }
    return { kind: 'semantic', semantic: { query: quoted[0], speaker }, assistant: `Certo! Procurando por "${quoted[0]}"${speaker !== 'any' ? ` em falas do ${speaker}` : ''}.` };
  }

  // Pattern: cliente/agente disse|falou|mencionou <palavra>
  const lower = ascii.toLowerCase();
  const speakerGuess: 'cliente'|'agente'|'any' = lower.includes('cliente') ? 'cliente' : lower.includes('agente') ? 'agente' : 'any';
  const saidMatch = lower.match(/(?:disse|falou|mencionou)\s+([\p{L}0-9_-]{2,})/u);
  if (saidMatch && saidMatch[1]) {
    const detectedDate = detectDateRange(ascii);
    if (detectedDate) {
      return { kind: 'mixed', semantic: { query: saidMatch[1], speaker: speakerGuess }, dateRange: detectedDate, assistant: `Ok! Vou procurar por "${saidMatch[1]}" em falas do ${speakerGuess}${humanizeDate(detectedDate)}.` };
    }
    return { kind: 'semantic', semantic: { query: saidMatch[1], speaker: speakerGuess }, assistant: `Certo! Procurando por "${saidMatch[1]}" em falas do ${speakerGuess}.` };
  }

  // Deterministic extraction (no LLM call)
  const detectedDate = detectDateRange(ascii);
  const semanticOnly = detectSemanticTerm(ascii);
  const detectedSpeaker: 'cliente'|'agente'|'any' = ascii.toLowerCase().includes('cliente') || ascii.toLowerCase().includes('speaker 2') ? 'cliente' : ascii.toLowerCase().includes('agente') || ascii.toLowerCase().includes('speaker 1') ? 'agente' : 'any';

  if (semanticOnly || detectedDate) {
    const semantic = semanticOnly ? { query: semanticOnly, speaker: detectedSpeaker } : undefined;
    const kind: Intent['kind'] = semantic && detectedDate ? 'mixed' : semantic ? 'semantic' : 'parametric';
    const reply = buildAssistantReply(semantic?.query, detectedSpeaker, detectedDate);
    return { kind, semantic, dateRange: detectedDate, assistant: reply };
  }

  // Chitchat default
  return { kind: 'chitchat', assistant: buildChitchatReply(ascii) };
}

function detectDateRange(textAscii: string): Intent['dateRange'] | undefined {
  const t = textAscii.toLowerCase();
  const lastDays = t.match(/\b(?:ultim[oa]s?|passad[oa]s?)\s+(\d+)\s+dias?\b/);
  if (lastDays) return { filter: 'custom', lastDays: Number(lastDays[1]) };
  if (/\b(esta|essa) semana\b/.test(t)) return { filter: 'thisWeek' };
  if (/\b(este|esse|neste) mes\b/.test(t)) return { filter: 'thisMonth' };
  if (/\bhoje\b/.test(t)) return { filter: 'today' };
  return undefined;
}

function detectSemanticTerm(textAscii: string): string | undefined {
  const m = textAscii.toLowerCase().match(/(?:disse|falou|mencionou|citou)\s+([\p{L}0-9_-]{2,})/u);
  if (m && m[1]) return m[1];
  return undefined;
}

function humanizeDate(date?: Intent['dateRange']): string {
  if (!date) return '';
  if (date.filter === 'today') return ' hoje';
  if (date.filter === 'thisWeek') return ' nesta semana';
  if (date.filter === 'thisMonth') return ' neste mês';
  if (date.filter === 'custom' && date.lastDays) return ` nos últimos ${date.lastDays} dias`;
  if (date.filter === 'custom' && date.from && date.to) return ` entre ${date.from} e ${date.to}`;
  return '';
}

function buildAssistantReply(term?: string, speaker: 'cliente'|'agente'|'any' = 'any', date?: Intent['dateRange']): string {
  const who = speaker !== 'any' ? ` em falas do ${speaker}` : '';
  const when = humanizeDate(date);
  if (term) return `Encontrei trechos sobre "${term}"${who}${when}. Quer ver no Dashboard?`;
  return `Ok! Aplico o filtro de período${when}. Quer ver no Dashboard?`;
}

function buildChitchatReply(textAscii: string): string {
  const t = textAscii.toLowerCase();
  if (/\bbom dia\b/.test(t)) return 'Bom dia! Como posso ajudar nas suas buscas?';
  if (/\bboa tarde\b/.test(t)) return 'Boa tarde! Posso filtrar por falas e período. O que você precisa?';
  if (/\bboa noite\b/.test(t)) return 'Boa noite! Diga, por exemplo: cliente disse "vazamento" esta semana.';
  return 'Posso buscar chamadas por termos ditos por cliente ou agente e por período (hoje, semana, últimos N dias).';
}
