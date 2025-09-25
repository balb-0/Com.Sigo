const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testWebhooks() {
    console.log('🧪 Iniciando testes dos webhooks híbridos...\n');

    // Payload de Sucesso (versão rica em dados)
    console.log('1️⃣ Testando webhook de sucesso com dados completos...');
    try {
        const successPayload = {
            jobId: "test_job_hibrido_001",
            filename: "teste_sucesso.wav",
            transcription: "Este é um teste de transcrição bem-sucedida, com dados de análise.",
            qualityScore: 92,
            sentiment: "positivo",
            analysis: {
                intent: "solicitacao_religacao",
                sentiment: "neutral"
            },
            processedAt: new Date().toISOString()
        };

        const response = await axios.post(`${BASE_URL}/webhook/processing-success`, successPayload);
        console.log('✅ Sucesso:', response.data);

    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }

    console.log('\n');

    // Payload de Falha
    console.log('2️⃣ Testando webhook de falha...');
    try {
        const failurePayload = {
            jobId: "test_job_hibrido_002",
            filename: "teste_falha.wav",
            error: "Arquivo de áudio corrompido ou formato inválido.",
            errorCode: "CORRUPTED_FILE",
            failedAt: new Date().toISOString(),
            retryCount: 0
        };

        const response = await axios.post(`${BASE_URL}/webhook/processing-failure`, failurePayload);
        console.log('✅ Sucesso:', response.data);

    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }
}

// Executa os testes
testWebhooks();