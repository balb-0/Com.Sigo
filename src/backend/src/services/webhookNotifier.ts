import axios from 'axios';

interface WebhookPayload {
  jobId: string;
  clienteId: string;
  status: 'started' | 'success' | 'failure';
  data?: any;
  error?: string;
  receivedAt?: string;
}

export class WebhookNotifier {
  private webhookUrl: string;

  constructor(webhookUrl: string = process.env.WEBHOOK_URL || 'http://localhost:3001') {
    this.webhookUrl = webhookUrl;
  }

  /**
   * Notifica o início do processamento de áudio
   */
  async notifyProcessingStart(jobId: string, clienteId: string): Promise<void> {
    const payload: WebhookPayload = {
      jobId,
      clienteId,
      status: 'started',
      receivedAt: new Date().toISOString()
    };

    try {
      await axios.post(`${this.webhookUrl}/webhook/processing-start`, payload);
      console.log(`⏳ Webhook de início enviado para job ${jobId}`);
    } catch (error) {
      console.error('❌ Erro ao enviar webhook de início:', error);
    }
  }

  /**
   * Notifica o sucesso do processamento de áudio
   */
  async notifyProcessingSuccess(jobId: string, clienteId: string, data: any): Promise<void> {
    const payload: WebhookPayload = {
      jobId,
      clienteId,
      status: 'success',
      data,
      receivedAt: new Date().toISOString()
    };

    try {
      await axios.post(`${this.webhookUrl}/webhook/processing-success`, payload);
      console.log(`✅ Webhook de sucesso enviado para job ${jobId}`);
    } catch (error) {
      console.error('❌ Erro ao enviar webhook de sucesso:', error);
    }
  }

  /**
   * Notifica falha no processamento de áudio
   */
  async notifyProcessingFailure(jobId: string, clienteId: string, error: string): Promise<void> {
    const payload: WebhookPayload = {
      jobId,
      clienteId,
      status: 'failure',
      error,
      receivedAt: new Date().toISOString()
    };

    try {
      await axios.post(`${this.webhookUrl}/webhook/processing-failure`, payload);
      console.log(`❌ Webhook de falha enviado para job ${jobId}`);
    } catch (error) {
      console.error('❌ Erro ao enviar webhook de falha:', error);
    }
  }
}

// Instância singleton para uso em todo o sistema
export const webhookNotifier = new WebhookNotifier();
