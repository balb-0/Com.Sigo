import { chamadaService } from '../services/chamada.service'; 
import { chamadaRepository } from '../repositories/chamada.repository'; 

// 1. Mock do Módulo chamadaRepository
jest.mock('../repositories/chamada.repository', () => ({
  chamadaRepository: {
    list: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
  },
}));

// Obtém os mocks e usa a sintaxe de cast <Tipo> para aumentar a compatibilidade com o Babel/Jest
const mockCreate = <jest.Mock>chamadaRepository.create;
const mockList = <jest.Mock>chamadaRepository.list;
const mockGetById = <jest.Mock>chamadaRepository.getById;


// Define um JSON de chamada válido para reuso nos testes
const mockValidJsonData = {
  meta: {
    seed: 123,
    persona: 'client-1',
    scenario: 'suporte',
    complyCriteriaIds: ['1.0'],
    violateCriteriaIds: ['3.0'],
  },
  results: [
    {
      channelTag: 1,
      alternatives: [
        {
          words: [{ word: 'Olá', endTime: '1.0s', startTime: '0.5s', speakerTag: 1 }],
          confidence: 0.9,
          transcript: 'Olá, obrigado pela ajuda. Tenha um bom dia.', // Transcrição de tamanho médio
        },
      ],
    },
  ],
  totalBilledTime: '10s',
};

describe('chamadaService', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configura o valor de retorno padrão para o mock de criação (sem Spread Operator)
    const mockResult = { 
        id: 1, 
        meta: mockValidJsonData.meta,
        results: mockValidJsonData.results,
        totalBilledTime: mockValidJsonData.totalBilledTime
    };
    
    mockCreate.mockResolvedValue(mockResult);
  });

  // --- Testes para Métodos de Repositório ---

  describe('list', () => {
    it('deve chamar chamadaRepository.list', async () => {
      mockList.mockResolvedValue([{ id: 1 }, { id: 2 }]);
      
      const result = await chamadaService.list();

      expect(mockList).toHaveBeenCalledTimes(1);
      expect(result).toHaveLength(2);
    });
  });

  describe('getById', () => {
    it('deve chamar chamadaRepository.getById com o ID correto', async () => {
      const mockId = 99;
      mockGetById.mockResolvedValue({ id: mockId, data: 'teste' });

      const result = await chamadaService.getById(mockId);

      expect(mockGetById).toHaveBeenCalledWith(mockId);
      expect(result).toHaveProperty('id', mockId);
    });
  });

  // --- Testes para createFromJson (Validação e Sucesso) ---

  describe('createFromJson', () => {
    it('deve chamar chamadaRepository.create e retornar o resultado', async () => {
      const expectedResult = { id: 100, data: 'nova_chamada' };
      mockCreate.mockResolvedValue(expectedResult);

      const result = await chamadaService.createFromJson(mockValidJsonData);

      // Verificações de chamada e formato de dados
      expect(mockCreate).toHaveBeenCalledTimes(1);
      const dataPassedToRepository = mockCreate.mock.calls[0][0];
      expect(dataPassedToRepository).toHaveProperty('cliente_id', 'cliente_client-1_123');
      expect(dataPassedToRepository.avaliacao_json).toBeDefined();
      
      expect(result).toBe(expectedResult);
    });

    it('deve lançar erro se o JSON for inválido (faltando meta)', async () => {
      const invalidJson = { ...mockValidJsonData, meta: undefined }; // Remove a meta

      await expect(chamadaService.createFromJson(invalidJson)).rejects.toThrow('JSON deve conter um objeto "meta" válido');
      expect(mockCreate).not.toHaveBeenCalled();
    });

    it('deve lançar erro se meta.seed não for um número', async () => {
      const invalidJson = { 
        ...mockValidJsonData, 
        meta: { ...mockValidJsonData.meta, seed: 'nao-e-numero' } 
      };

      await expect(chamadaService.createFromJson(invalidJson)).rejects.toThrow('meta.seed deve ser um número');
      expect(mockCreate).not.toHaveBeenCalled();
    });
  });
});