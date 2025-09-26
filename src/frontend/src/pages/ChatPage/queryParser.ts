export type DashboardQuery = {
  filter?: 'all' | 'thisWeek' | 'thisMonth' | 'today' | 'custom';
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  minScore?: number;
  maxScore?: number;
  tag?: string;
};

function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseDateDDMM(text: string): string | undefined {
  const m = text.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (!m) return undefined;
  const day = m[1].padStart(2, '0');
  const month = m[2].padStart(2, '0');
  const year = (m[3] ?? String(new Date().getFullYear())).slice(-4);
  return `${year}-${month}-${day}`;
}

function formatISOToInput(iso: string): string {
  // iso YYYY-MM-DD -> input date value
  return iso;
}

export function parseChatQueryToParams(raw: string): { params: DashboardQuery; summary: string } | null {
  const text = normalize(raw);
  const params: DashboardQuery = {};
  const parts: string[] = [];

  // Time filters
  if (/\b(ultima|ultima|passada) semana\b/.test(text) || /\bsemana passada\b/.test(text)) {
    params.filter = 'thisWeek';
    parts.push('Última semana');
  } else if (/\b(esta|essa|nesta) semana\b/.test(text) || /\bsemana\b/.test(text)) {
    params.filter = 'thisWeek';
    parts.push('Esta semana');
  } else if (/\bhoje\b/.test(text)) {
    params.filter = 'today';
    parts.push('Hoje');
  } else if (/\b(este|esse|neste) mes\b/.test(text) || /\bmes atual\b/.test(text)) {
    params.filter = 'thisMonth';
    parts.push('Este mês');
  }

  // Custom range: "entre 01/09 e 10/09" or "de 01/09 ate 10/09"
  const between = text.match(/\b(entre|de)\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\s+(e|ate)\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\b/);
  if (between) {
    const start = parseDateDDMM(between[2]);
    const end = parseDateDDMM(between[4]);
    if (start && end) {
      params.filter = 'custom';
      params.startDate = formatISOToInput(start);
      params.endDate = formatISOToInput(end);
      parts.push(`De ${between[2]} até ${between[4]}`);
    }
  }

  // Yesterday -> custom same-day
  if (/\bontem\b/.test(text)) {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const iso = d.toISOString().slice(0, 10);
    params.filter = 'custom';
    params.startDate = iso;
    params.endDate = iso;
    parts.push('Ontem');
  }

  // Score
  const maiorQue = text.match(/\b(maior que|acima de|>)\s*(\d{1,2})\b/);
  if (maiorQue) {
    const n = Math.min(10, Math.max(0, Number(maiorQue[2])));
    params.minScore = n + 1; // strictly greater
    parts.push(`Nota > ${n}`);
  }
  const maiorOuIgual = text.match(/\b(maior ou igual a|>=)\s*(\d{1,2})\b/);
  if (maiorOuIgual) {
    const n = Math.min(10, Math.max(0, Number(maiorOuIgual[2])));
    params.minScore = n;
    parts.push(`Nota ≥ ${n}`);
  }
  const menorQue = text.match(/\b(menor que|abaixo de|<)\s*(\d{1,2})\b/);
  if (menorQue) {
    const n = Math.min(10, Math.max(0, Number(menorQue[2])));
    params.maxScore = n - 1; // strictly less
    parts.push(`Nota < ${n}`);
  }
  const menorOuIgual = text.match(/\b(menor ou igual a|<=)\s*(\d{1,2})\b/);
  if (menorOuIgual) {
    const n = Math.min(10, Math.max(0, Number(menorOuIgual[2])));
    params.maxScore = n;
    parts.push(`Nota ≤ ${n}`);
  }
  const entreNotas = text.match(/\b(entre)\s*(\d{1,2})\s*(e|a)\s*(\d{1,2})\b/);
  if (entreNotas) {
    const n1 = Math.min(10, Math.max(0, Number(entreNotas[2])));
    const n2 = Math.min(10, Math.max(0, Number(entreNotas[4])));
    params.minScore = Math.min(n1, n2);
    params.maxScore = Math.max(n1, n2);
    parts.push(`Nota entre ${params.minScore} e ${params.maxScore}`);
  }

  // Tags: "com tag empatia" or "com tag girias"
  const tag = text.match(/\bcom tag\s+([\p{L}\s]+)\b/u);
  if (tag) {
    const name = tag[1].trim();
    if (name) {
      params.tag = name;
      parts.push(`Tag: ${name}`);
    }
  }

  if (Object.keys(params).length === 0) return null;
  const summary = parts.join(' • ');
  return { params, summary };
}

export function buildDashboardQueryString(params: DashboardQuery): string {
  const search = new URLSearchParams();
  if (params.filter) search.set('filter', params.filter);
  if (params.startDate) search.set('startDate', params.startDate);
  if (params.endDate) search.set('endDate', params.endDate);
  if (params.startTime) search.set('startTime', params.startTime);
  if (params.endTime) search.set('endTime', params.endTime);
  if (typeof params.minScore === 'number') search.set('minScore', String(params.minScore));
  if (typeof params.maxScore === 'number') search.set('maxScore', String(params.maxScore));
  if (params.tag) search.set('tag', params.tag);
  const qs = search.toString();
  return `/?${qs}`;
}
