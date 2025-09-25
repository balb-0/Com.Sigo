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
  
  // Criar dados para inserção
  const createData = {
    cliente_id,
    atendente_id,
    transcript_json: jsonData,
  };

  return chamadaRepository.create(createData);
}

export const chamadaService = { list, getById, createFromJson };
