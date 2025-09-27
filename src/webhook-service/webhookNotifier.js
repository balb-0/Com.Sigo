const axios = require('axios');

// Endereço do seu serviço de webhook.
// Use 'http://localhost:3000' para testes locais.
// Em produção, isso será substituído pelo IP do servidor.
const WEBHOOK_BASE_URL = process.env.WEBHOOK_URL || 'http://localhost:3000';

/**
 * Notifica o webhook que o processamento de um job começou.
 * @param {string} jobId - ID único da tarefa de processamento.
 * @param {string} clienteId - ID do cliente associado à tarefa.
 */
async function notifyProcessingStart(jobId, clienteId ) {
    const payload = { jobId, clienteId };
    try {
        console.log(`[WEBHOOK] Notificando INÍCIO do Job ID: ${jobId}`);
        // Faz a chamada POST para o endpoint /webhook/processing-start
        await axios.post(`${WEBHOOK_BASE_URL}/webhook/processing-start`, payload);
        console.log(`[WEBHOOK] Notificação de INÍCIO para ${jobId} enviada.`);
    } catch (error) {
        console.error(`[WEBHOOK] ERRO ao notificar início para ${jobId}:`, error.message);
    }
}

/**
 * Notifica o webhook que o processamento terminou com sucesso.
 * @param {object} successData - O payload completo com os dados da transcrição e análise.
 */
async function notifyProcessingSuccess(successData) {
    const { jobId } = successData;
    try {
        console.log(`[WEBHOOK] Notificando SUCESSO do Job ID: ${jobId}`);
        // Faz a chamada POST para o endpoint /webhook/processing-success
        await axios.post(`${WEBHOOK_BASE_URL}/webhook/processing-success`, successData);
        console.log(`[WEBHOOK] Notificação de SUCESSO para ${jobId} enviada.`);
    } catch (error) {
        console.error(`[WEBHOOK] ERRO ao notificar sucesso para ${jobId}:`, error.message);
    }
}

/**
 * Notifica o webhook que o processamento falhou.
 * @param {string} jobId - ID único da tarefa que falhou.
 * @param {string} error - Uma mensagem descritiva do erro.
 * @param {string} [errorCode] - (Opcional) Um código de erro específico.
 */
async function notifyProcessingFailure(jobId, error, errorCode) {
    const payload = { jobId, error, errorCode };
    try {
        console.log(`[WEBHOOK] Notificando FALHA no Job ID: ${jobId}`);
        // Faz a chamada POST para o endpoint /webhook/processing-failure
        await axios.post(`${WEBHOOK_BASE_URL}/webhook/processing-failure`, payload);
        console.log(`[WEBHOOK] Notificação de FALHA para ${jobId} enviada.`);
    } catch (error) {
        console.error(`[WEBHOOK] ERRO ao notificar falha para ${jobId}:`, error.message);
    }
}

// Exportamos as três funções para que outros arquivos do seu projeto possam usá-las
module.exports = {
    notifyProcessingStart,
    notifyProcessingSuccess,
    notifyProcessingFailure
};
