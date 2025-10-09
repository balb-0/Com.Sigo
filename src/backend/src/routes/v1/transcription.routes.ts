import { Router } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { transcribeLocalAudioFilePTBR } from '../../services/transcription.service';
// No topo do seu arquivo de processamento de áudio, adicione esta linha:
const webhookNotifier = require('../../services/webhookNotifier'); // Ajuste o caminho se necessário

export const transcriptionRouter = Router();

type TranscribeBody = {
  url?: string;
};

/**
 * @openapi
 * tags:
 *   - name: Transcription
 *     description: Transcrição de áudios
 */

/**
 * @openapi
 * /v1/transcribe/audio:
 *   post:
 *     summary: Transcreve um arquivo de áudio previamente enviado
 *     tags: [Transcription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: Caminho retornado pelo endpoint de upload (/uploads/arquivo.ext)
 *     responses:
 *       200:
 *         description: Resultado da transcrição
 *       400:
 *         description: Requisição inválida
 *       404:
 *         description: Arquivo não encontrado
 *       500:
 *         description: Falha na transcrição
 */
transcriptionRouter.post('/audio', async (req, res) => {
  const jobId = `job_${Date.now()}`;
  const clienteId = req.body.clienteId || 'unknown';

  try {
    // Notificar início do processamento
    await webhookNotifier.notifyProcessingStart(jobId, clienteId);

    const body = req.body as TranscribeBody;
    const url = body?.url?.trim();
    if (!url) {
      return res.status(400).json({ error: 'Missing url' });
    }

    // Expecting url like /uploads/<filename>
    // Ensure we only take the basename to avoid directory traversal
    let filename = '';
    try {
      const fakeOrigin = 'http://localhost';
      const u = new URL(url, fakeOrigin);
      filename = path.basename(u.pathname);
    } catch {
      filename = path.basename(url);
    }

    const localFilePath = path.join(process.cwd(), 'src', 'storage', 'uploads', filename);

    try {
      await fs.access(localFilePath);
    } catch {
      return res.status(404).json({ error: 'File not found' });
    }

    const result = await transcribeLocalAudioFilePTBR(localFilePath);

    // Notificar sucesso do processamento
    await webhookNotifier.notifyProcessingSuccess(jobId, clienteId, result);

    return res.json(result);
  } catch (err) {
    // Notificar falha do processamento
    await webhookNotifier.notifyProcessingFailure(jobId, clienteId, err.message);

    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ error: 'Transcription failed' });
  }
});
