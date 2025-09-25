const processedEvents = [];
const failedEvents = [];

/**
 * Processa notificações de sucesso.
 * @param {Object} payload - Dados recebidos do webhook, contendo status e dados completos.
 * @returns {Object} - Resultado do processamento.
 */
function handleProcessingSuccess(payload) {
    // 1. Processamento da Versão 1: Preparar os dados para o banco
    const { jobId, transcription, qualityScore, analysis, sentiment } = payload;
    
    // Simula a preparação dos dados para o repositório da Versão 1
    const chamadaRecord = {
        cliente_id: jobId,
        transcript_json: { transcription, sentiment },
        avaliacao_json: { analysis },
        nota_qualidade: qualityScore,
        data_registro: new Date().toISOString()
    };
    
    // AQUI SERIA A CHAMADA AO BANCO DE DADOS DA VERSÃO 1
    // Exemplo: chamadaRepository.create(chamadaRecord);
    
    console.log(`Dados da chamada preparados para o banco:`, JSON.stringify(chamadaRecord, null, 2));

    // 2. Processamento da Versão 2: Armazenar evento para monitoramento
    const processedEvent = {
        id: generateEventId(),
        jobId,
        status: 'success',
        processedAt: new Date().toISOString()
    };
    
    processedEvents.push(processedEvent);
    
    console.log(`✅ Evento de sucesso registrado em memória.`);

    return {
        eventId: processedEvent.id,
        jobId: processedEvent.jobId,
        message: 'Evento processado e armazenado temporariamente.'
    };
}

/**
 * Processa notificações de falha.
 * @param {Object} payload - Dados recebidos do webhook.
 * @returns {Object} - Resultado do processamento.
 */
function handleProcessingFailure(payload) {
    const { jobId, error, errorCode } = payload;

    if (!jobId || !error) {
        throw new Error('jobId e error são obrigatórios no payload de falha');
    }

    const failedEvent = {
        id: generateEventId(),
        jobId,
        error,
        errorCode,
        status: 'failed',
        receivedAt: new Date().toISOString()
    };
    
    failedEvents.push(failedEvent);
    
    console.log(`❌ Evento de falha registrado em memória.`);

    return {
        eventId: failedEvent.id,
        jobId: failedEvent.jobId,
        message: 'Evento de falha processado e armazenado.'
    };
}

function generateEventId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
    handleProcessingSuccess,
    handleProcessingFailure
};