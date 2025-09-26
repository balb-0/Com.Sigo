const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testWebhooks() {
    console.log('🧪 Iniciando testes dos webhooks com payloads simples...\\n');

    // Payload de Início de Processamento
    console.log('0️⃣ Testando webhook de início de processamento...');
    try {
        const startPayload = {
            jobId: "start_job_001",
            clienteId: "cliente_123"
        };
        const response = await axios.post(`${BASE_URL}/webhook/processing-start`, startPayload);
        console.log('✅ Sucesso (Início):', response.data);
    } catch (error) {
        console.log('❌ Erro (Início):', error.response?.data || error.message);
    }
    console.log('\\n');

    // Payload de Sucesso (simples)
    console.log('1️⃣ Testando webhook de sucesso...');
    try {
        const successPayload = {
            jobId: "test_job_001",
            clienteId: "cliente_123",
            chamada_id: "chamada_001",
            resultado: "sucesso"
        };
        const response = await axios.post(`${BASE_URL}/webhook/processing-success`, successPayload);
        console.log('✅ Sucesso:', response.data);
    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }

    console.log('\\n');

    // Payload de Falha (simples)
    console.log('2️⃣ Testando webhook de falha...');
    try {
        const failurePayload = {
            jobId: "test_job_002",
            clienteId: "cliente_123",
            chamada_id: "chamada_002",
            resultado: "falha"
        };
        const response = await axios.post(`${BASE_URL}/webhook/processing-failure`, failurePayload);
        console.log('✅ Sucesso:', response.data);
    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }
}

// Executa os testes
testWebhooks();