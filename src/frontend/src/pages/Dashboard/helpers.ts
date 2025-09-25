import { type Chamada, type Tag } from '../../components/Table/Table';
import { type ChamadaResponse } from '../../lib/api';

export type AvaliacaoJson = {
    resumo?: { nota_calculada_1_10?: number };
    criterios?: Record<string, { resultado?: 'Aprovado' | 'Reprovado' | string }>;
};

export function formatDateTime(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hour}:${minute}`;
}

const TAG_HINTS: Record<string, string> = {
    'Abertura OK': 'Abertura de contato padrão aprovada.',
    'Sem Abertura': 'Critério de abertura não identificado.',
    'Encerramento OK': 'Encerramento de contato padrão aprovado.',
    'Sem Encerramento': 'Critério de encerramento não identificado.',
    'Empatia': 'Demonstrou empatia durante o atendimento.',
    'Sem Empatia': 'Não demonstrou empatia suficiente.',
    'Cordialidade': 'Tratou o cliente com cordialidade.',
    'Falta de Cordialidade': 'Faltou cordialidade no atendimento.',
    'Sem Gírias': 'Diálogo sem vícios de linguagem/gírias.',
    'Gírias Identificadas': 'Identificadas gírias ou vícios de linguagem.',
    'Pesquisa Satisfação': 'Direcionou para a pesquisa de satisfação.',
    'Sem Pesquisa': 'Não direcionou para pesquisa de satisfação.',
    'Falha Ética': 'Possível falha relacionada à ética.',
    'Desconexão Indevida': 'Indício de desconexão indevida.',
};

export function buildTagsFromAvaliacao(avaliacao: unknown | null): Tag[] {
    try {
        if (!avaliacao || typeof avaliacao !== 'object') return [];
        const data = avaliacao as AvaliacaoJson;
        const criterios = data.criterios ?? {};

        const tags: Tag[] = [];
        const pushIf = (condition: boolean, name: string, type: Tag['type']) => {
            if (condition) tags.push({ name, type, hint: TAG_HINTS[name] });
        };
        const res = (key: string): string | undefined => criterios?.[key]?.resultado;

        pushIf(res('1.1_abertura') === 'Aprovado', 'Abertura OK', 'positivo');
        pushIf(res('1.1_abertura') === 'Reprovado', 'Sem Abertura', 'negativo');

        pushIf(res('1.3_encerramento') === 'Aprovado', 'Encerramento OK', 'positivo');
        pushIf(res('1.3_encerramento') === 'Reprovado', 'Sem Encerramento', 'negativo');

        pushIf(res('2.1_empatia') === 'Aprovado', 'Empatia', 'positivo');
        pushIf(res('2.1_empatia') === 'Reprovado', 'Sem Empatia', 'negativo');

        pushIf(res('2.2_cordialidade') === 'Aprovado', 'Cordialidade', 'positivo');
        pushIf(res('2.2_cordialidade') === 'Reprovado', 'Falta de Cordialidade', 'negativo');

        pushIf(res('2.3_dialogo_vicios') === 'Aprovado', 'Sem Gírias', 'positivo');
        pushIf(res('2.3_dialogo_vicios') === 'Reprovado', 'Gírias Identificadas', 'negativo');

        pushIf(res('3.5_pesquisa_satisfacao') === 'Aprovado', 'Pesquisa Satisfação', 'positivo');
        pushIf(res('3.5_pesquisa_satisfacao') === 'Reprovado', 'Sem Pesquisa', 'neutro');

        pushIf(res('4.0_etica') === 'Reprovado', 'Falha Ética', 'negativo');
        pushIf(res('4.5_desconexao_indevida') === 'Reprovado', 'Desconexão Indevida', 'negativo');

        return tags.slice(0, 10);
    } catch {
        return [];
    }
}

export function formatChamadaRow(row: ChamadaResponse): Chamada {
    const created = new Date(row.created_at);
    const dataHora = formatDateTime(created);

    const resumoNota = (row.avaliacao_json as AvaliacaoJson | null)?.resumo?.nota_calculada_1_10;
    let score = 0;
    if (typeof resumoNota === 'number' && !Number.isNaN(resumoNota)) {
        score = Math.round(resumoNota);
    } else if (typeof row.nota_qualidade === 'number' && !Number.isNaN(row.nota_qualidade)) {
        score = Math.round(row.nota_qualidade * 2);
    }

    const tags = buildTagsFromAvaliacao(row.avaliacao_json ?? null);

    return {
        id: String(row.chamada_id),
        dataHora,
        pontuacao: score,
        tags,
        transcript_json: row.transcript_json ?? null,
        avaliacao_json: row.avaliacao_json ?? null,
    } as Chamada;
}
