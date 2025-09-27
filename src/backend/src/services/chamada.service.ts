import { chamadaRepository } from '../repositories/chamada.repository';

type JsonChamadaData = {
  meta: {
    seed: number;
    persona: string;
    scenario: string;
    complyCriteriaIds: string[];
    violateCriteriaIds: string[];
  };
  results: Array<{
    channelTag: number;
    alternatives: Array<{
      words: Array<{
        word: string;
        endTime: string;
        startTime: string;
        speakerTag: number;
      }>;
      confidence: number;
      transcript: string;
    }>;
  }>;
  totalBilledTime: string;
};

function generateBasicEvaluation(jsonData: any) {
  // Extrai o texto da transcrição para análise básica
  const transcript = extractTranscriptText(jsonData);
  const wordCount = transcript.split(' ').length;

  // Gera uma nota baseada em características básicas do texto
  let baseScore = 5; // Nota base

  // Ajusta baseado no comprimento da conversa
  if (wordCount < 50) baseScore -= 1; // Conversa muito curta
  if (wordCount > 500) baseScore += 1; // Conversa mais completa

  // Ajusta baseado em palavras positivas/negativas (análise simples)
  const positiveWords = ['obrigado', 'por favor', 'desculpe', 'senhor', 'senhora'];
  const negativeWords = ['droga', 'absurdo', 'idiota', 'merda'];

  const positiveCount = positiveWords.filter(word => transcript.toLowerCase().includes(word)).length;
  const negativeCount = negativeWords.filter(word => transcript.toLowerCase().includes(word)).length;

  baseScore += positiveCount * 0.5;
  baseScore -= negativeCount * 1;

  // Limita entre 1 e 10
  const finalScore = Math.max(1, Math.min(10, Math.round(baseScore)));

  return {
    resumo: {
      score_simples: finalScore / 10,
      score_ponderado: finalScore / 10,
      total_criterios: 6,
      criterios_aprovados: Math.round((finalScore / 10) * 6),
      nota_calculada_1_10: finalScore,
      criterios_reprovados: 6 - Math.round((finalScore / 10) * 6)
    },
    metadata: {
      cliente_id: jsonData.meta?.persona || 'unknown',
      data_avaliacao: new Date().toISOString(),
      versao_algoritmo: 'v1.0_basico',
      tamanho_transcricao: transcript.length,
      nota_qualidade_anterior: null
    },
    criterios: {
      '2.2_cordialidade': {
        resultado: positiveCount > 0 ? 'Aprovado' : 'Reprovado',
        evidencias: positiveWords.filter(word => transcript.toLowerCase().includes(word))
      },
      '2.3_dialogo_vicios': {
        resultado: negativeCount === 0 ? 'Aprovado' : 'Reprovado',
        evidencias: negativeWords.filter(word => transcript.toLowerCase().includes(word))
      },
      '2.1_empatia': {
        resultado: positiveCount > negativeCount ? 'Aprovado' : 'Reprovado',
        evidencias: [...positiveWords.filter(word => transcript.toLowerCase().includes(word)), ...negativeWords.filter(word => transcript.toLowerCase().includes(word))]
      },
      '1.1_abertura': {
        resultado: transcript.toLowerCase().includes('bom dia') || transcript.toLowerCase().includes('boa tarde') || transcript.toLowerCase().includes('olá') ? 'Aprovado' : 'Reprovado',
        evidencias: ['bom dia', 'boa tarde', 'olá'].filter(word => transcript.toLowerCase().includes(word))
      },
      '1.3_encerramento': {
        resultado: transcript.toLowerCase().includes('tenha um bom dia') || transcript.toLowerCase().includes('até logo') || transcript.toLowerCase().includes('obrigado') ? 'Aprovado' : 'Reprovado',
        evidencias: ['tenha um bom dia', 'até logo', 'obrigado'].filter(word => transcript.toLowerCase().includes(word))
      },
      '4.0_etica': {
        resultado: negativeCount === 0 && !transcript.toLowerCase().includes('absurdo') ? 'Aprovado' : 'Reprovado',
        evidencias: negativeWords.filter(word => transcript.toLowerCase().includes(word))
      }
    }
  };
}

function extractTranscriptText(jsonData: any): string {
  // Extrai o texto da transcrição do JSON
  if (jsonData.results && Array.isArray(jsonData.results)) {
    return jsonData.results
      .map((result: any) =>
        result.alternatives?.[0]?.transcript || ''
      )
      .join(' ');
  }
  return '';
}

async function list() {
  return chamadaRepository.list();
}

async function getById(id: number) {
  return chamadaRepository.getById(id);
}

async function createFromJson(jsonData: any) {
  // Validar estrutura básica
  if (!jsonData) {
    throw new Error('Dados JSON não fornecidos');
  }

  if (!jsonData.meta || typeof jsonData.meta !== 'object') {
    throw new Error('JSON deve conter um objeto "meta" válido');
  }

  if (!jsonData.results || !Array.isArray(jsonData.results)) {
    throw new Error('JSON deve conter um array "results" válido');
  }

  if (!jsonData.totalBilledTime) {
    throw new Error('JSON deve conter "totalBilledTime"');
  }

  // Validar estrutura meta
  const meta = jsonData.meta;
  if (typeof meta.seed !== 'number') {
    throw new Error('meta.seed deve ser um número');
  }
  if (typeof meta.persona !== 'string') {
    throw new Error('meta.persona deve ser uma string');
  }
  if (typeof meta.scenario !== 'string') {
    throw new Error('meta.scenario deve ser uma string');
  }

  // Extrair informações dos metadados
  const seed = meta.seed;
  const persona = meta.persona;

  // Gerar IDs baseados nos dados
  const cliente_id = `cliente_${persona}_${seed}`;
  const atendente_id = 'atendente_1'; // Atendente padrão ou extrair dos dados se disponível

  // Gerar uma avaliação básica simulada para demonstração
  // Em produção, aqui seria chamado o modelo de IA real
  const avaliacaoBasica = generateBasicEvaluation(jsonData);

  // Criar dados para inserção
  const createData = {
    cliente_id,
    atendente_id,
    transcript_json: jsonData,
    avaliacao_json: avaliacaoBasica,
    nota_qualidade: (() => {
      const svcNota = avaliacaoBasica?.resumo?.nota_calculada_1_10;
      if (typeof svcNota === 'number' && !Number.isNaN(svcNota)) return svcNota;
      const defaultNota = typeof (jsonData as any)?.defaultNota === 'number' ? (jsonData as any).defaultNota : 8;
      return defaultNota;
    })(),
  };

  return chamadaRepository.create(createData);
}

export const chamadaService = { list, getById, createFromJson };
