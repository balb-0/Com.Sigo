const processedEvents = [];
const failedEvents = [];
const startedEvents = [];

/**
 * Processa notificações de início de processamento.
 * @param {Object} payload - Dados iniciais da chamada.
 * @returns {Object} - Confirmação do processamento.
 */
function handleProcessingStart(payload) {
    const { jobId, clienteId } = payload;
    
    if (!jobId || !clienteId) {
        throw new Error('jobId e clienteId são obrigatórios no payload de início.');
    }

    const startedEvent = {
        id: generateEventId(),
        jobId,
        clienteId,
        status: 'started',
        receivedAt: new Date().toISOString()
    };
    
    startedEvents.push(startedEvent);
    
    console.log(`⏳ Evento de início registrado para o job ${jobId}.`);

    return {
        eventId: startedEvent.id,
        jobId: startedEvent.jobId,
        message: 'Evento de início processado.'
    };
}


/**
 * Processa notificações de sucesso (payload simples).
 * @param {Object} payload - Dados recebidos do webhook.
 * @returns {Object} - Resultado do processamento.
 */
function handleProcessingSuccess(payload) {
    const { jobId, clienteId, chamada_id, resultado } = payload;
    
    if (!jobId || !clienteId || !chamada_id || resultado !== 'sucesso') {
        throw new Error('Payload de sucesso incompleto ou inválido.');
    }

    const processedEvent = {
        id: generateEventId(),
        jobId,
        clienteId,
        chamada_id,
        status: 'success',
        receivedAt: new Date().toISOString()
    };
    
    processedEvents.push(processedEvent);
    
    console.log(`✅ Evento de sucesso registrado em memória.`);

    return {
        eventId: processedEvent.id,
        jobId: processedEvent.jobId,
        message: 'Evento de sucesso processado.'
    };
}

/**
 * Processa notificações de falha (payload simples).
 * @param {Object} payload - Dados recebidos do webhook.
 * @returns {Object} - Resultado do processamento.
 */
function handleProcessingFailure(payload) {
    const { jobId, clienteId, resultado } = payload;

    if (!jobId || !clienteId || resultado !== 'falha') {
        throw new Error('Payload de falha incompleto ou inválido');
    }

    const failedEvent = {
        id: generateEventId(),
        jobId,
        clienteId,
        status: 'failed',
        receivedAt: new Date().toISOString()
    };
    
    failedEvents.push(failedEvent);
    
    console.log(`❌ Evento de falha registrado em memória.`);

    return {
        eventId: failedEvent.id,
        jobId: failedEvent.jobId,
        message: 'Evento de falha processado.'
    };
}

function generateEventId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
    handleProcessingSuccess,
    handleProcessingFailure,
    handleProcessingStart
};