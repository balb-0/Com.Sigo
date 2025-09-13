// Testes automatizados para webhooks
// Arquivo: src/backend/tests/webhook.test.js

const request = require('supertest');
const app = require('../app'); // Ajustar caminho conforme sua estrutura

describe('Webhooks', () => {
  
  describe('POST /webhook/text', () => {
    
    test('deve processar payload válido de texto', async () => {
      const payload = {
        sourceId: "test-chat-001",
        text: "Cliente solicitou religação do gás",
        meta: { canal: "whatsapp", uf: "SP" },
        analysis: { intent: "solicitacao_religacao", sentiment: "neutral" },
        score: 4.2
      };

      const response = await request(app)
        .post('/webhook/text')
        .send(payload)
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.created).toBeDefined();
      expect(response.body.created.transcript_json.type).toBe('text');
      expect(response.body.created.transcript_json.text).toBe(payload.text);
    });

    test('deve processar payload mínimo (apenas texto)', async () => {
      const payload = {
        text: "Texto mínimo para teste"
      };

      const response = await request(app)
        .post('/webhook/text')
        .send(payload)
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.created.transcript_json.text).toBe(payload.text);
    });

    test('deve retornar erro 400 quando texto estiver ausente', async () => {
      const payload = {
        sourceId: "test-001",
        meta: { canal: "chat" }
      };

      const response = await request(app)
        .post('/webhook/text')
        .send(payload)
        .expect(400);

      expect(response.body.error).toBe("Missing required field 'text' in payload");
    });

    test('deve retornar erro 400 quando texto estiver vazio', async () => {
      const payload = {
        text: "   ", // Apenas espaços
        sourceId: "test-002"
      };

      const response = await request(app)
        .post('/webhook/text')
        .send(payload)
        .expect(400);

      expect(response.body.error).toBe("Missing required field 'text' in payload");
    });

  });

  describe('POST /webhook/voice', () => {
    
    test('deve processar payload válido de voz', async () => {
      const payload = {
        audioId: "test-call-001",
        transcription: {
          text: "Bom dia, gostaria de solicitar religação",
          confidence: 0.92,
          duration: 45.3
        },
        analysis: { cordialidade: true, sentiment: "positive" },
        score: 4.8
      };

      const response = await request(app)
        .post('/webhook/voice')
        .send(payload)
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.created).toBeDefined();
      expect(response.body.created.transcript_json.type).toBe('voice');
      expect(response.body.created.transcript_json.transcription).toEqual(payload.transcription);
    });

    test('deve processar transcription como string simples', async () => {
      const payload = {
        transcription: "Transcrição simples como string"
      };

      const response = await request(app)
        .post('/webhook/voice')
        .send(payload)
        .expect(200);

      expect(response.body.status).toBe('ok');
      expect(response.body.created.transcript_json.transcription).toBe(payload.transcription);
    });

    test('deve retornar erro 400 quando transcription estiver ausente', async () => {
      const payload = {
        audioId: "test-001",
        analysis: { sentiment: "positive" }
      };

      const response = await request(app)
        .post('/webhook/voice')
        .send(payload)
        .expect(400);

      expect(response.body.error).toBe("Missing required field 'transcription' in payload");
    });

    test('deve retornar erro 400 quando transcription for null', async () => {
      const payload = {
        audioId: "test-002",
        transcription: null
      };

      const response = await request(app)
        .post('/webhook/voice')
        .send(payload)
        .expect(400);

      expect(response.body.error).toBe("Missing required field 'transcription' in payload");
    });

  });

  describe('Testes de Edge Cases', () => {
    
    test('deve processar payload com caracteres especiais', async () => {
      const payload = {
        text: "Cliente disse: 'Não estou satisfeito!' com acentuação e símbolos @#$%",
        meta: {
          emoji: "😀😡🔥",
          unicode: "测试中文字符"
        }
      };

      const response = await request(app)
        .post('/webhook/text')
        .send(payload)
        .expect(200);

      expect(response.body.status).toBe('ok');
    });

    test('deve processar payload grande', async () => {
      const payload = {
        text: "A".repeat(10000), // Texto muito longo
        meta: {
          large_data: "B".repeat(5000)
        }
      };

      const response = await request(app)
        .post('/webhook/text')
        .send(payload)
        .expect(200);

      expect(response.body.status).toBe('ok');
    });

    test('deve processar score com diferentes valores', async () => {
      const testCases = [0, 2.5, 5, 4.999];
      
      for (const score of testCases) {
        const payload = {
          text: `Teste com score ${score}`,
          score: score
        };

        const response = await request(app)
          .post('/webhook/text')
          .send(payload)
          .expect(200);

        expect(response.body.created.nota_qualidade).toBe(score);
      }
    });

  });

});

// Configuração para testes
beforeAll(async () => {
  // Configurar banco de dados de teste se necessário
  console.log('Configurando ambiente de teste...');
});

afterAll(async () => {
  // Limpar recursos após testes
  console.log('Limpando ambiente de teste...');
});

afterEach(async () => {
  // Limpar dados entre testes se necessário
});