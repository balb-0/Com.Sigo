// Script de teste manual para webhooks
// Arquivo: src/backend/scripts/test-webhooks.js

const axios = require('axios');

const BASE_URL = 'http://localhost:3000'; // Ajustar conforme sua configuração

async function testWebhooks() {
    console.log('🧪 Iniciando testes manuais dos webhooks...\n');
    
    // Teste 1: Webhook de texto - payload completo
    console.log('1️⃣ Testando webhook de texto (payload completo)...');
    try {
        const textPayload = {
            sourceId: "manual-test-001",
            text: "Cliente solicitou religação e informou leitura do medidor",
            meta: { 
                canal: "whatsapp", 
                uf: "SP",
                timestamp: new Date().toISOString()
            },
            analysis: { 
                intent: "solicitacao_religacao", 
                sentiment: "neutral",
                confidence: 0.85
            },
            score: 4.2
        };
        
        const response = await axios.post(`${BASE_URL}/webhook/text`, textPayload);
        console.log('✅ Sucesso:', response.data);
        
    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Teste 2: Webhook de texto - payload mínimo
    console.log('2️⃣ Testando webhook de texto (payload mínimo)...');
    try {
        const minimalPayload = {
            text: "Teste com payload mínimo"
        };
        
        const response = await axios.post(`${BASE_URL}/webhook/text`, minimalPayload);
        console.log('✅ Sucesso:', response.data);
        
    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Teste 3: Webhook de voz - payload completo
    console.log('3️⃣ Testando webhook de voz (payload completo)...');
    try {
        const voicePayload = {
            audioId: "manual-test-call-001",
            transcription: {
                text: "Bom dia, gostaria de solicitar a religação do meu gás",
                confidence: 0.92,
                duration: 45.3,
                language: "pt-BR",
                speaker_segments: [
                    {
                        speaker: "cliente",
                        text: "Bom dia, gostaria de solicitar a religação do meu gás",
                        start: 0.0,
                        end: 3.2
                    }
                ]
            },
            analysis: {
                cordialidade: true,
                tempo_resposta: 2.1,
                interrupcoes: 0,
                palavras_chave: ["religação", "gás"],
                sentiment: "positive"
            },
            score: 4.8
        };
        
        const response = await axios.post(`${BASE_URL}/webhook/voice`, voicePayload);
        console.log('✅ Sucesso:', response.data);
        
    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Teste 4: Webhook de voz - transcription simples
    console.log('4️⃣ Testando webhook de voz (transcription simples)...');
    try {
        const simpleVoicePayload = {
            transcription: "Transcrição simples para teste manual"
        };
        
        const response = await axios.post(`${BASE_URL}/webhook/voice`, simpleVoicePayload);
        console.log('✅ Sucesso:', response.data);
        
    } catch (error) {
        console.log('❌ Erro:', error.response?.data || error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Teste 5: Teste de erro - texto ausente
    console.log('5️⃣ Testando erro (texto ausente)...');
    try {
        const invalidPayload = {
            sourceId: "error-test-001",
            meta: { canal: "test" }
            // Faltando campo 'text' obrigatório
        };
        
        const response = await axios.post(`${BASE_URL}/webhook/text`, invalidPayload);
        console.log('❌ Deveria ter dado erro, mas retornou:', response.data);
        
    } catch (error) {
        console.log('✅ Erro esperado:', error.response?.data || error.message);
    }
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Teste 6: Teste de erro - transcription ausente
    console.log('6️⃣ Testando erro (transcription ausente)...');
    try {
        const invalidVoicePayload = {
            audioId: "error-test-002",
            analysis: { sentiment: "positive" }
            // Faltando campo 'transcription' obrigatório
        };
        
        const response = await axios.post(`${BASE_URL}/webhook/voice`, invalidVoicePayload);
        console.log('❌ Deveria ter dado erro, mas retornou:', response.data);
        
    } catch (error) {
        console.log('✅ Erro esperado:', error.response?.data || error.message);
    }
    
    console.log('\n🏁 Testes manuais concluídos!');
    console.log('\n📊 Resumo:');
    console.log('- Testados cenários de sucesso e erro');
    console.log('- Validados payloads completos e mínimos');
    console.log('- Verificados ambos os webhooks (/text e /voice)');
}

// Função para testar conectividade
async function testConnection() {
    console.log('🔗 Testando conectividade com o servidor...');
    try {
        const response = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Servidor respondendo:', response.data);
        return true;
    } catch (error) {
        console.log('❌ Servidor não está respondendo:', error.message);
        console.log('💡 Certifique-se de que o servidor está rodando em', BASE_URL);
        return false;
    }
}

// Executar testes
async function main() {
    console.log('🚀 Iniciando script de teste dos webhooks\n');
    
    // Verificar conectividade primeiro
    const isConnected = await testConnection();
    
    if (isConnected) {
        console.log('\n');
        await testWebhooks();
    } else {
        console.log('\n⚠️  Não foi possível conectar ao servidor. Testes cancelados.');
        console.log('📝 Para executar os testes:');
        console.log('   1. Inicie o servidor: npm start');
        console.log('   2. Execute este script: node scripts/test-webhooks.js');
    }
}

// Executar se chamado diretamente
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    testWebhooks,
    testConnection
};

