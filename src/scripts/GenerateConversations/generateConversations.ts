import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { createOpenAIClient, resolveModel } from '../AiClients/openAi.js';

type Speaker = 'Atendente' | 'Cliente';

type PersonaProfile = {
  name: 'furioso' | 'irritado' | 'neutro' | 'satisfeito' | 'polido';
  clientProfanityTurnRatio: number; // 0..1
  styleNote: string;
};

type Turn = {
  speaker: Speaker;
  text: string;
};

type STTWord = {
  word: string;
  startTime: string; // e.g. "0.1s"
  endTime: string;   // e.g. "0.3s"
  speakerTag: 1 | 2; // 1=Atendente, 2=Cliente
};

type STTJson = {
  results: Array<{
    alternatives: Array<{
      transcript: string;
      confidence: number;
      words: STTWord[];
    }>;
    channelTag: 1;
  }>;
  totalBilledTime: string;
  meta?: {
    scenario: string;
    persona: PersonaProfile['name'];
    complyCriteriaIds: string[];
    violateCriteriaIds: string[];
    seed: number;
  };
};

type Criterion = { id: string; title: string; description?: string };

const ALL_CRITERIA: Criterion[] = [
  { id: '1.1', title: 'Abertura de contato' },
  { id: '1.2', title: 'Procedimento de espera', description: 'Sinalizar ausência e retornar a cada 1 minuto' },
  { id: '1.3', title: 'Encerramento de contato', description: 'Encerrar corretamente e se colocar à disposição' },
  { id: '2.0', title: 'Confirmação de dados quando necessário (cliente sitiado)' },
  { id: '2.1', title: 'Empatia' },
  { id: '2.2', title: 'Cordialidade' },
  { id: '2.3', title: 'Diálogo claro e objetivo, sem vícios/gírias do atendente' },
  { id: '3.0', title: 'Identificação positiva' },
  { id: '3.1', title: 'Análise de histórico' },
  { id: '3.2', title: 'Abertura de STs e notas completas' },
  { id: '3.3', title: 'Conhecimento de produtos e serviços' },
  { id: '3.4', title: 'Oportunidades de negócios e Comgás Virtual' },
  { id: '3.5', title: 'Direcionar para pesquisa de satisfação e informar transferência' },
  { id: '4.0', title: 'Ética' },
  { id: '4.1', title: 'Procedimento correto, sem impacto financeiro' },
  { id: '4.2', title: 'Direcionamento correto de STs' },
  { id: '4.3', title: 'Registro de solicitação completo nas notas' },
  { id: '4.4', title: 'Abertura/Classificação de OS correta' },
  { id: '4.5', title: 'Não desconectar cliente indevidamente' },
  { id: '4.6', title: 'Não induzir o consumidor a encerrar' },
  { id: '4.7', title: 'Confirmar dados antes de solicitações/reclamações' },
  { id: '4.8', title: 'Seguir passos para abertura de solicitações (OS)' },
  { id: '4.10', title: 'Informar corretamente percentual do Reajuste Tarifário' },
  { id: 'DR1', title: 'Solicitação do cliente foi atendida?' },
  { id: 'DR2', title: 'Solicitação atendida sem falhas?' },
];

function pickCriteriaPlan(rng: () => number, adherenceRatio: number): { comply: string[]; violate: string[] } {
  const ids = [...new Set(ALL_CRITERIA.map(c => c.id))];
  // Shuffle
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  const numComply = Math.max(1, Math.round(ids.length * adherenceRatio));
  const comply = ids.slice(0, numComply);
  const violate = ids.slice(numComply);
  return { comply, violate };
}

// Simple seeded RNG for reproducibility
function createSeededRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    // xorshift32
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };
}

function secondsToLabel(valueSeconds: number): string {
  return `${Number(valueSeconds.toFixed(3))}s`;
}

function textToWords(text: string): string[] {
  return text
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

function buildSTTFromTurns(turns: Turn[], seed: number, meta?: STTJson['meta']): STTJson {
  const rng = createSeededRandom(seed);
  let currentTime = 0;
  const words: STTWord[] = [];

  for (const turn of turns) {
    const speakerTag: 1 | 2 = turn.speaker === 'Atendente' ? 1 : 2;
    const tokens = textToWords(turn.text);
    for (const token of tokens) {
      const duration = 0.08 + rng() * 0.32; // 0.08s to 0.40s per token
      const start = currentTime;
      const end = start + duration;
      words.push({
        word: token,
        startTime: secondsToLabel(start),
        endTime: secondsToLabel(end),
        speakerTag,
      });
      currentTime = end;
    }
    // brief pause between turns
    currentTime += 0.2 + rng() * 0.5; // 0.2s to 0.7s gap
  }

  const transcript = words.map(w => w.word).join(' ');
  const confidence = Number((0.86 + rng() * 0.13).toFixed(7));
  const totalBilledTime = secondsToLabel(words.length ? parseFloat(words[words.length - 1].endTime) : 0);

  return {
    results: [
      {
        alternatives: [
          {
            transcript,
            confidence,
            words,
          },
        ],
        channelTag: 1,
      },
    ],
    totalBilledTime,
    meta,
  };
}

const cliOptionsSchema = z.object({
  count: z.number().int().min(1).max(10000).default(1),
  outDir: z.string().default('GenerateConversations/results'),
  prefix: z.string().default('conversation'),
  model: z.string().default(resolveModel()),
  minTurns: z.number().int().min(4).max(50).default(8),
  maxTurns: z.number().int().min(4).max(50).default(16),
  temperature: z.number().min(0).max(2).default(0.8),
  topP: z.number().min(0).max(1).default(1),
  seed: z.number().int().optional(),
  prompt: z.string().optional(),
  promptFile: z.string().optional(),
  // Chaos controls
  chaos: z.number().min(0).max(1).default(0.5),
  agentSnapChance: z.number().min(0).max(1).default(0.07),
  // Two-stage prompting controls
  twoStage: z.boolean().default(true),
  creativeTemperature: z.number().min(0).max(2).default(1.0),
  structureTemperature: z.number().min(0).max(2).default(0.2),
  // Scenario controls
  scenarios: z.string().optional(), // pipe or comma separated
  scenariosFile: z.string().optional(), // file with one scenario per line
  perScenario: z.number().int().min(1).max(10000).default(1),
  // Scenario range controls
  startScenarioIndex: z.number().int().min(1).default(1),
  startScenario: z.string().optional(), // e.g., "s05" or "5"
  // Quality criteria adherence controls
  adherenceRatio: z.number().min(0).max(1).default(0.85),
  compliantConversationRatio: z.number().min(0).max(1).default(0.85),
  nonCompliantAdherenceRatio: z.number().min(0).max(1).default(0.35),
  // Profanity controls
  allowProfanity: z.boolean().default(true),
  allowAgentProfanity: z.boolean().default(false),
  maxClientProfanityTurnRatio: z.number().min(0).max(1).optional(),
  profanityExamples: z.boolean().default(true),
});

function parseArgs(argv: string[]) {
  const args: Record<string, string | number | boolean> = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const [key, val] = arg.includes('=') ? arg.slice(2).split('=') : [arg.slice(2), argv[i + 1]];
      if (!arg.includes('=') && typeof val !== 'undefined' && !val.startsWith('--')) i++;
      if (val === undefined) {
        args[key] = true;
      } else if (val === 'true' || val === 'false') {
        args[key] = val === 'true';
      } else {
        args[key] = val;
      }
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1);
      const val = argv[i + 1];
      if (val && !val.startsWith('-')) {
        args[key] = val;
        i++;
      } else {
        args[key] = true;
      }
    }
  }

  const normalized = cliOptionsSchema.parse({
    count: Number(args.count ?? args.n ?? 1),
    outDir: String(args.out ?? args.o ?? 'GenerateConversations/results'),
    prefix: String(args.prefix ?? 'conversation'),
    model: String(args.model ?? resolveModel()),
    minTurns: Number(args['min-turns'] ?? 8),
    maxTurns: Number(args['max-turns'] ?? 16),
    temperature: Number(args.temperature ?? 0.8),
    topP: Number(args.top_p ?? args.topp ?? 1),
    seed: args.seed !== undefined ? Number(args.seed) : undefined,
    prompt: args.prompt !== undefined ? String(args.prompt) : undefined,
    promptFile: args['prompt-file'] !== undefined ? String(args['prompt-file']) : undefined,
    chaos: args.chaos !== undefined ? Number(args.chaos) : 0.5,
    agentSnapChance: args['agent-snap-chance'] !== undefined ? Number(args['agent-snap-chance']) : 0.07,
    twoStage: args['two-stage'] !== undefined ? Boolean(args['two-stage']) : true,
    creativeTemperature: args['creative-temperature'] !== undefined ? Number(args['creative-temperature']) : 1.0,
    structureTemperature: args['structure-temperature'] !== undefined ? Number(args['structure-temperature']) : 0.2,
    scenarios: args.scenarios !== undefined ? String(args.scenarios) : undefined,
    scenariosFile: args['scenarios-file'] !== undefined ? String(args['scenarios-file']) : undefined,
    perScenario: args['per-scenario'] !== undefined ? Number(args['per-scenario']) : 1,
    startScenarioIndex: args['start-scenario-index'] !== undefined ? Number(args['start-scenario-index']) : 1,
    startScenario: args['start-scenario'] !== undefined ? String(args['start-scenario']) : undefined,
    adherenceRatio: args['adherence-ratio'] !== undefined ? Number(args['adherence-ratio']) : 0.85,
    compliantConversationRatio: args['compliant-conversation-ratio'] !== undefined ? Number(args['compliant-conversation-ratio']) : 0.85,
    nonCompliantAdherenceRatio: args['noncompliant-adherence-ratio'] !== undefined ? Number(args['noncompliant-adherence-ratio']) : 0.35,
    allowProfanity: args['allow-profanity'] !== undefined ? Boolean(args['allow-profanity']) : true,
    allowAgentProfanity: args['allow-agent-profanity'] !== undefined ? Boolean(args['allow-agent-profanity']) : false,
    maxClientProfanityTurnRatio: args['max-client-profanity-turn-ratio'] !== undefined ? Number(args['max-client-profanity-turn-ratio']) : undefined,
    profanityExamples: args['profanity-examples'] !== undefined ? Boolean(args['profanity-examples']) : true,
  });

  if (normalized.minTurns > normalized.maxTurns) {
    throw new Error('minTurns cannot be greater than maxTurns');
  }
  return normalized;
}

async function loadPromptText(opts: z.infer<typeof cliOptionsSchema>): Promise<string | undefined> {
  if (opts.prompt) return opts.prompt;
  if (opts.promptFile) {
    const filePath = path.resolve(process.cwd(), opts.promptFile);
    return fs.readFileSync(filePath, 'utf8');
  }
  return undefined;
}

function baseInstruction(opts: z.infer<typeof cliOptionsSchema>, userPrompt?: string): string {
  const lines: string[] = [];
  lines.push(
    'Gere um diálogo verossímil em PT-BR de um atendimento ao cliente por telefone entre um cliente e uma empresa fornecedora de gás (distribuição residencial/comercial no Brasil).'
  );
  lines.push('Regras gerais:');
  lines.push('- Use os rótulos "Atendente:" e "Cliente:" em cada fala.');
  lines.push(`- Entre ${opts.minTurns} e ${opts.maxTurns} falas no total (turnos).`);
  lines.push('- Tom natural, conciso e objetivo; evite monólogos longos.');
  if (opts.allowProfanity) {
    const examples = opts.profanityExamples ? ' Exemplos: "poxa", "droga" (evite termos extremamente ofensivos).' : '';
    lines.push(`- Pode conter gírias e eventuais palavrões leves de forma verossímil (nível de caos = ${opts.chaos}).${examples}`);
  } else {
    lines.push('- Não utilizar palavrões.');
  }
  lines.push('- Inclua temas comuns: ligação de emergência (vazamento), 2ª via, falta de gás, instalação, troca de titularidade, renegociação, agendamento, etc.');
  lines.push('- Não inclua narrativa, apenas as falas.');
  if (userPrompt) {
    lines.push('Instruções adicionais do usuário:');
    lines.push(userPrompt);
  }
  return lines.join('\n');
}

function creativeInstruction(
  opts: z.infer<typeof cliOptionsSchema>,
  scenario: string,
  meltdown: boolean,
  persona: PersonaProfile,
  complyCriteriaIds: string[],
  violateCriteriaIds: string[]
): string {
  const lines: string[] = [];
  lines.push('[TAREFA] Escreva um diálogo curto em PT-BR entre Cliente e Atendente de uma companhia de gás.');
  lines.push(`Cenário: ${scenario}`);
  lines.push(`Comprimento: ${opts.minTurns}-${opts.maxTurns} falas no total.`);
  lines.push('Estilo: extremamente natural, com ruídos de fala espontânea, interrupções, pausas, e gírias brasileiras.');
  lines.push(`Nível de caos: ${opts.chaos} (mais caos = mais gírias, frustração e improviso).`);
  lines.push(`Perfil do cliente: ${persona.name} (${persona.styleNote}).`);
  if (!opts.allowProfanity || persona.clientProfanityTurnRatio === 0) {
    lines.push('O cliente NÃO usa palavrões.');
  } else {
    const base = opts.maxClientProfanityTurnRatio ?? (persona.clientProfanityTurnRatio * 0.3);
    const percentage = Math.max(0, Math.min(100, Math.round(base * 100)));
    lines.push(`No MÁXIMO ~${percentage}% das FALAS do cliente podem conter palavrões leves; evite termos fortes.`);
  }
  if (meltdown && opts.allowAgentProfanity) {
    lines.push('O Atendente pode demonstrar impaciência em UMA fala, sem usar palavrões.');
  } else {
    lines.push('O Atendente mantém profissionalismo e NÃO usa palavrões.');
  }
  lines.push('Formatação de saída: apenas linhas alternadas com prefixos "Cliente:" e "Atendente:", nada além do diálogo.');
  // Quality criteria plan
  lines.push('Critérios de qualidade (IDs) e como comportar-se neste diálogo específico:');
  lines.push('Atenda/COMPLIQUE conforme a lista abaixo. "Cumprir" = demonstrar aderência explícita; "Violação" = não cumprir ou contrariar.');
  lines.push('IDs a CUMPRIR: ' + (complyCriteriaIds.length ? complyCriteriaIds.join(', ') : '(nenhum)'));
  lines.push('IDs a VIOLAR: ' + (violateCriteriaIds.length ? violateCriteriaIds.join(', ') : '(nenhum)'));
  lines.push('Os IDs referem-se ao seguinte quadro:');
  lines.push('- 1.1 Abertura de contato adequada');
  lines.push('- 1.2 Procedimento de espera: sinalizar ausência e retornar a cada 1 minuto');
  lines.push('- 1.3 Encerramento correto com colocação à disposição');
  lines.push('- 2.0 Confirmação de dados quando necessário (evitar se cliente já está identificado)');
  lines.push('- 2.1 Empatia');
  lines.push('- 2.2 Cordialidade');
  lines.push('- 2.3 Diálogo claro e objetivo, sem vícios/gírias do atendente');
  lines.push('- 3.0 Identificação positiva conforme processo');
  lines.push('- 3.1 Análise de histórico para entender necessidade');
  lines.push('- 3.2 Abertura de STs com categorização e notas completas');
  lines.push('- 3.3 Conhecimento de produtos e serviços');
  lines.push('- 3.4 Oportunidades de negócios e incentivo ao Comgás Virtual');
  lines.push('- 3.5 Direcionar para pesquisa de satisfação e informar transferência');
  lines.push('- 4.0 Ética (NÃO difamar)');
  lines.push('- 4.1 Procedimento correto para evitar impacto financeiro');
  lines.push('- 4.2 Direcionamento correto de STs quando necessário');
  lines.push('- 4.3 Registro de solicitação completo nas notas');
  lines.push('- 4.4 Abertura/Classificação de OS correta');
  lines.push('- 4.5 Não desconectar indevidamente');
  lines.push('- 4.6 Não induzir o consumidor a encerrar');
  lines.push('- 4.7 Confirmar dados antes de solicitações/reclamações');
  lines.push('- 4.8 Seguir passos para abertura de solicitações (OS)');
  lines.push('- 4.10 Informar corretamente percentual do Reajuste Tarifário');
  lines.push('- DR1 Solicitação atendida?');
  lines.push('- DR2 Solicitação atendida sem falhas?');
  return lines.join('\n');
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

function choosePersonaForScenario(scenario: string, rng: () => number): PersonaProfile {
  const personas: Record<PersonaProfile['name'], PersonaProfile> = {
    furioso: { name: 'furioso', clientProfanityTurnRatio: 0.6, styleNote: 'cliente explode às vezes, xinga em algumas falas, tom agressivo' },
    irritado: { name: 'irritado', clientProfanityTurnRatio: 0.3, styleNote: 'cliente impaciente, reclama, palavrões ocasionais' },
    neutro: { name: 'neutro', clientProfanityTurnRatio: 0.1, styleNote: 'cliente direto, raros palavrões' },
    satisfeito: { name: 'satisfeito', clientProfanityTurnRatio: 0.02, styleNote: 'cliente educado, elogia quando resolvido' },
    polido: { name: 'polido', clientProfanityTurnRatio: 0, styleNote: 'cliente formal e sem palavrões' },
  };

  const s = scenario.toLowerCase();
  let weights: Array<{ persona: PersonaProfile; weight: number }> = [];

  if (s.includes('puto') || s.includes('irrit') || s.includes('atras') || s.includes('demor')) {
    weights = [
      { persona: personas.furioso, weight: 4 },
      { persona: personas.irritado, weight: 3 },
      { persona: personas.neutro, weight: 2 },
      { persona: personas.satisfeito, weight: 1 },
      { persona: personas.polido, weight: 0.5 },
    ];
  } else if (s.includes('satisfeito') || s.includes('elog') || s.includes('feliz')) {
    weights = [
      { persona: personas.satisfeito, weight: 4 },
      { persona: personas.polido, weight: 2 },
      { persona: personas.neutro, weight: 2 },
      { persona: personas.irritado, weight: 1 },
      { persona: personas.furioso, weight: 0.5 },
    ];
  } else if (s.includes('segunda via') || s.includes('vencimento') || s.includes('multa')) {
    weights = [
      { persona: personas.irritado, weight: 3 },
      { persona: personas.neutro, weight: 3 },
      { persona: personas.furioso, weight: 1 },
      { persona: personas.satisfeito, weight: 1 },
      { persona: personas.polido, weight: 1 },
    ];
  } else {
    weights = [
      { persona: personas.neutro, weight: 3 },
      { persona: personas.irritado, weight: 2 },
      { persona: personas.satisfeito, weight: 2 },
      { persona: personas.polido, weight: 1 },
      { persona: personas.furioso, weight: 1 },
    ];
  }

  const total = weights.reduce((a, b) => a + b.weight, 0);
  let r = rng() * total;
  for (const w of weights) {
    if ((r -= w.weight) <= 0) return w.persona;
  }
  return weights[0].persona;
}

async function structureTurnsWithLLM(opts: z.infer<typeof cliOptionsSchema>, rawDialog: string): Promise<Turn[]> {
  const client = createOpenAIClient();
  const completion = await client.chat.completions.create({
    model: opts.model,
    temperature: opts.structureTemperature,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Converta um diálogo rotulado em texto para JSON estruturado.' },
      { role: 'user', content: [
        'Converta o diálogo abaixo em JSON no formato: { "turns": [{"speaker": "Atendente"|"Cliente", "text": string }] }',
        'Preserve o conteúdo textual incluindo gírias e palavrões.',
        'Diálogo:\n' + rawDialog
      ].join('\n') }
    ],
  });

  const content = completion.choices[0]?.message?.content ?? '{}';
  const turnsSchema = z.object({
    turns: z.array(z.object({
      speaker: z.union([z.literal('Atendente'), z.literal('Cliente')]),
      text: z.string().min(1),
    })).min(2),
  });
  const parsed = JSON.parse(content);
  const { turns } = turnsSchema.parse(parsed);
  return turns;
}

function structureTurnsLocally(rawDialog: string): Turn[] {
  const lines = rawDialog.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const turns: Turn[] = [];
  for (const line of lines) {
    const m = line.match(/^(Atendente|Cliente)\s*:\s*(.*)$/i);
    if (!m) continue;
    const speaker = m[1].charAt(0).toUpperCase() + m[1].slice(1).toLowerCase();
    const text = m[2].trim();
    if (speaker === 'Atendente' || speaker === 'Cliente') {
      turns.push({ speaker: speaker as Speaker, text });
    }
  }
  return turns;
}

async function loadScenarios(opts: z.infer<typeof cliOptionsSchema>): Promise<string[]> {
  if (opts.scenarios) {
    const sep = opts.scenarios.includes('|') ? '|' : ',';
    return opts.scenarios.split(sep).map(s => s.trim()).filter(Boolean);
  }
  if (opts.scenariosFile) {
    const p = path.resolve(process.cwd(), opts.scenariosFile);
    const raw = fs.readFileSync(p, 'utf8');
    return raw.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  }
  // default 10 scenarios
  return [
    'Cliente reporta vazamento e fica puto porque o técnico vai demorar',
    'Vazamento mas cliente fica satisfeito com atendimento e prazos',
    'Segunda via não chega e discussão sobre vencimento e multa',
    'Cliente sem gás por falha de abastecimento no bairro, irritado',
    'Troca de titularidade com documentos faltando, cliente impaciente',
    'Negociação de dívida com parcelas, cliente pressiona desconto',
    'Agendamento de instalação atrasado, cliente xinga e ameaça cancelar',
    'Cliente liga por suspeita de cheiro de gás, atendente acalma e orienta',
    'Reclamação de atendimento anterior grosseiro, pede ouvidoria',
    'Dúvida sobre taxa de religação após corte por inadimplência'
  ];
}

async function generateTurns(
  opts: z.infer<typeof cliOptionsSchema>,
  scenario: string,
  rng: () => number,
  persona: PersonaProfile,
  complyCriteriaIds: string[],
  violateCriteriaIds: string[]
): Promise<Turn[]> {
  const client = createOpenAIClient();
  const meltdown = rng() < opts.agentSnapChance;
  const stage1 = await client.chat.completions.create({
    model: opts.model,
    temperature: opts.creativeTemperature,
    top_p: opts.topP,
    messages: [
      { role: 'system', content: 'Você escreve diálogos realistas de call center brasileiros com energia caótica quando necessário.' },
      { role: 'user', content: creativeInstruction(opts, scenario, meltdown, persona, complyCriteriaIds, violateCriteriaIds) },
    ],
  });
  const rawDialog = stage1.choices[0]?.message?.content ?? '';

  if (opts.twoStage) {
    return structureTurnsWithLLM(opts, rawDialog);
  }
  const turns = structureTurnsLocally(rawDialog);
  if (turns.length < 2) {
    // Fallback: minimal two-turn dialog if parsing failed
    return [
      { speaker: 'Cliente', text: 'Oi, preciso de ajuda com meu gás.' },
      { speaker: 'Atendente', text: 'Claro, me diga o que está acontecendo.' },
    ];
  }
  return turns;
}

async function main() {
  const opts = parseArgs(process.argv);
  const userPrompt = await loadPromptText(opts);
  const instruction = baseInstruction(opts, userPrompt);

  const outDirAbs = path.resolve(process.cwd(), opts.outDir);
  fs.mkdirSync(outDirAbs, { recursive: true });

  const baseSeed = opts.seed ?? Math.floor(Date.now() % 1_000_000_000);
  const rng = createSeededRandom(baseSeed);

  const scenarios = await loadScenarios(opts);
  const useScenarios = scenarios.length > 0;

  if (useScenarios) {
    let index = 0;
    // Determine starting scenario index (0-based)
    const startFromLabelMatch = opts.startScenario?.match(/^s?(\d{1,})$/i);
    const startScenarioIndexOneBased = startFromLabelMatch ? Number(startFromLabelMatch[1]) : opts.startScenarioIndex;
    const startSi = Math.max(0, Math.min(scenarios.length - 1, startScenarioIndexOneBased - 1));
    for (let si = startSi; si < scenarios.length; si++) {
      const scenario = scenarios[si];
      const scenarioSlug = slugify(scenario);
      const scenarioId = `s${String(si + 1).padStart(2, '0')}`;
      for (let j = 0; j < opts.perScenario; j++) {
        const seed = baseSeed + index * 97;
        const persona = choosePersonaForScenario(scenario, rng);
        // decide adherence for this conversation
        const compliantConversation = rng() < opts.compliantConversationRatio;
        const plan = pickCriteriaPlan(rng, compliantConversation ? opts.adherenceRatio : opts.nonCompliantAdherenceRatio);
        const turns = await generateTurns(
          opts,
          [instruction, `Cenário específico: ${scenario}`].join('\n\n'),
          rng,
          persona,
          plan.comply,
          plan.violate
        );
        const stt = buildSTTFromTurns(turns, seed, {
          scenario,
          persona: persona.name,
          complyCriteriaIds: plan.comply,
          violateCriteriaIds: plan.violate,
          seed,
        });
        const fileName = `${opts.prefix}-${scenarioId}-${scenarioSlug}-${persona.name}-${String(j + 1).padStart(3, '0')}.json`;
        const filePath = path.join(outDirAbs, fileName);
        fs.writeFileSync(filePath, JSON.stringify(stt, null, 2), 'utf8');
        await new Promise(r => setTimeout(r, 200));
        // eslint-disable-next-line no-console
        console.log(`Saved: ${filePath}`);
        index++;
      }
    }
    return;
  }

  for (let i = 0; i < opts.count; i++) {
    const seed = baseSeed + i * 97;
    const persona = choosePersonaForScenario(instruction, rng);
    const compliantConversation = rng() < opts.compliantConversationRatio;
    const plan = pickCriteriaPlan(rng, compliantConversation ? opts.adherenceRatio : opts.nonCompliantAdherenceRatio);
    const turns = await generateTurns(opts, instruction, rng, persona, plan.comply, plan.violate);
    const stt = buildSTTFromTurns(turns, seed, {
      scenario: 'default-instruction',
      persona: persona.name,
      complyCriteriaIds: plan.comply,
      violateCriteriaIds: plan.violate,
      seed,
    });
    const fileName = `${opts.prefix}-${String(i + 1).padStart(3, '0')}.json`;
    const filePath = path.join(outDirAbs, fileName);
    fs.writeFileSync(filePath, JSON.stringify(stt, null, 2), 'utf8');
    await new Promise(r => setTimeout(r, 200));
    // eslint-disable-next-line no-console
    console.log(`Saved: ${filePath}`);
  }
}

// Execute if run directly
// eslint-disable-next-line @typescript-eslint/no-floating-promises
main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err?.message || err);
  process.exit(1);
});
