const express = require('express');
const cors = require('cors');
const { handleProcessingSuccess, handleProcessingFailure } = require('./webhook-handlers');

const app = express();

// Middlewares essenciais
app.use(cors());
app.use(express.json());

// Endpoint Híbrido para Sucesso
// Recebe o status "sucesso" e o payload completo de dados
app.post('/webhook/processing-success', (req, res) => {
    try {
        console.log('✅ Webhook de SUCESSO recebido.');
        console.log('Payload:', JSON.stringify(req.body, null, 2));

        const result = handleProcessingSuccess(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Notificação de sucesso processada',
            data: result
        });

    } catch (error) {
        console.error('❌ Erro no webhook de sucesso:', error.message);
        res.status(500).json({ status: 'error', message: 'Erro interno', error: error.message });
    }
});

// Endpoint Híbrido para Falha
// Recebe o status "falha" e o payload de erro
app.post('/webhook/processing-failure', (req, res) => {
    try {
        console.log('❌ Webhook de FALHA recebido.');
        console.log('Payload:', JSON.stringify(req.body, null, 2));

        const result = handleProcessingFailure(req.body);

        res.status(200).json({
            status: 'success',
            message: 'Notificação de falha processada',
            data: result
        });

    } catch (error) {
        console.error('❌ Erro no webhook de falha:', error.message);
        res.status(500).json({ status: 'error', message: 'Erro interno', error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor de webhooks híbrido rodando na porta ${PORT}`);
});

module.exports = app;