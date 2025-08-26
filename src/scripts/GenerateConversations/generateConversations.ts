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
};

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

function buildSTTFromTurns(turns: Turn[], seed: number): STTJson {
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
  lines.push(`- Pode conter gírias e palavrões, inclusive fortes, de forma verossímil (nível de caos = ${opts.chaos}). Exemplos: "Porra", "Caralho", "Seus merdas", "Filhas da puta", "Essa bosta não funciona", "Cadê essa porra?", "Que demora do caralho".`);
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
  persona: PersonaProfile
): string {
  const lines: string[] = [];
  lines.push('[TAREFA] Escreva um diálogo curto em PT-BR entre Cliente e Atendente de uma companhia de gás.');
  lines.push(`Cenário: ${scenario}`);
  lines.push(`Comprimento: ${opts.minTurns}-${opts.maxTurns} falas no total.`);
  lines.push('Estilo: extremamente natural, com ruídos de fala espontânea, interrupções, pausas, e gírias brasileiras.');
  lines.push(`Nível de caos: ${opts.chaos} (mais caos = mais gírias, frustração e improviso).`);
  lines.push(`Perfil do cliente: ${persona.name} (${persona.styleNote}).`);
  if (persona.clientProfanityTurnRatio === 0) {
    lines.push('O cliente NÃO usa palavrões.');
  } else {
    const percentage = Math.round((persona.clientProfanityTurnRatio * 100) * 0.5);
    lines.push(`No MÁXIMO ~${percentage}% das FALAS do cliente devem conter palavrões. Varie: algumas sem, outras com, evite palavrão em toda fala.`);
  }
  if (meltdown) {
    lines.push('ATENÇÃO: Neste diálogo específico, o Atendente perde a paciência e responde de forma ríspida em pelo menos uma fala (sem ser criminoso/ofensivo a minorias).');
  } else {
    lines.push('O Atendente mantém profissionalismo, evitando palavrões, mesmo diante de ofensas ocasionais do cliente.');
  }
  lines.push('Permita palavrões quando for natural, sem exagerar em todas as falas.');
  lines.push('Formatação de saída: apenas linhas alternadas com prefixos "Cliente:" e "Atendente:", nada além do diálogo.');
  lines.push('Exemplo de uma fala: Cliente: Cara, essa porra não funciona há dois dias, socorro.');
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
  persona: PersonaProfile
): Promise<Turn[]> {
  const client = createOpenAIClient();
  const meltdown = rng() < opts.agentSnapChance;
  const stage1 = await client.chat.completions.create({
    model: opts.model,
    temperature: opts.creativeTemperature,
    top_p: opts.topP,
    messages: [
      { role: 'system', content: 'Você escreve diálogos realistas de call center brasileiros com energia caótica quando necessário.' },
      { role: 'user', content: creativeInstruction(opts, scenario, meltdown, persona) },
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
    for (let si = 0; si < scenarios.length; si++) {
      const scenario = scenarios[si];
      const scenarioSlug = slugify(scenario);
      const scenarioId = `s${String(si + 1).padStart(2, '0')}`;
      for (let j = 0; j < opts.perScenario; j++) {
        const seed = baseSeed + index * 97;
        const persona = choosePersonaForScenario(scenario, rng);
        const turns = await generateTurns(
          opts,
          [instruction, `Cenário específico: ${scenario}`].join('\n\n'),
          rng,
          persona
        );
        const stt = buildSTTFromTurns(turns, seed);
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
    const turns = await generateTurns(opts, instruction, rng, persona);
    const stt = buildSTTFromTurns(turns, seed);
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
