type DashboardQuery = {
  filter?: 'all' | 'thisWeek' | 'thisMonth' | 'today' | 'custom';
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string;   // HH:mm
  minScore?: number;  // 0-10
  maxScore?: number;  // 0-10
  tag?: string;
};

type NLParseResult = { params: DashboardQuery; summary: string };

function buildJsonSchema() {
  return {
    name: 'DashboardFilters',
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        params: {
          type: 'object',
          additionalProperties: false,
          properties: {
            filter: { type: 'string', enum: ['all', 'thisWeek', 'thisMonth', 'today', 'custom'] },
            startDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
            endDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
            startTime: { type: 'string', pattern: '^\\d{2}:\\d{2}$' },
            endTime: { type: 'string', pattern: '^\\d{2}:\\d{2}$' },
            minScore: { type: 'number', minimum: 0, maximum: 10 },
            maxScore: { type: 'number', minimum: 0, maximum: 10 },
            tag: { type: 'string' },
          },
        },
        summary: { type: 'string' },
      },
      required: ['params', 'summary'],
    },
    strict: true,
  } as const;
}

export async function parseFiltersFromTextPTBR(text: string): Promise<NLParseResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is required');

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const OpenAI = require('openai');
  const client = new OpenAI({ apiKey });

  const schema = buildJsonSchema();
  const instructions = [
    'Você é um parser de linguagem natural focado em PT-BR.',
    'Transforme pedidos de filtros do usuário em JSON estrito com o formato abaixo.',
    'IMPORTANTÍSSIMO: responda SOMENTE com JSON válido, sem nenhum texto antes ou depois.',
    'Não invente campos; use apenas os permitidos.',
    'Datas: YYYY-MM-DD. Horário: HH:mm. Notas de 0 a 10.',
    'Mapeamentos: "esta/última semana" -> filter=thisWeek; "hoje" -> filter=today; "este mês" -> filter=thisMonth.',
    'Faixas explícitas (ex: 01/09 a 10/09) -> filter=custom + startDate/endDate.',
    'Exemplos de tags: empatia, girias, pesquisa, etc.',
    'Resumo (summary) curto e amigável para mostrar ao usuário.',
    '',
    'Schema esperado (exemplo de chaves e tipos):',
    JSON.stringify(schema.schema),
  ].join('\n');

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
    input: [
      { role: 'system', content: instructions },
      { role: 'user', content: text },
    ],
    temperature: 0,
  });

  const raw =
    response.output_text ||
    (response.output && Array.isArray(response.output) ? response.output.map((o: any) => o.content?.[0]?.text).filter(Boolean).join('\n') : '') ||
    '';
  if (!raw) return null;

  // Try direct JSON parse; if it fails, attempt to extract the first JSON object
  const tryParse = (s: string) => {
    try { return JSON.parse(s) as NLParseResult; } catch { return null; }
  };

  let parsed = tryParse(raw.trim());
  if (!parsed) {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      parsed = tryParse(raw.slice(start, end + 1));
    }
  }
  return parsed;
}
