import { Request, Response } from 'express';
import { chamadaRepository } from '../repositories/chamada.repository';

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

async function handleText(req: Request, res: Response) {
  try {
    const payload = req.body ?? {};

    const sourceId = isNonEmptyString(payload.sourceId) ? payload.sourceId : null;
    const text = isNonEmptyString(payload.text) ? payload.text : null;
    const meta: unknown = payload.meta ?? null;
    const analysis: unknown = payload.analysis ?? null;
    const score: number | null = typeof payload.score === 'number' ? payload.score : null;

    if (!text) {
      return res.status(400).json({ error: "Missing required field 'text' in payload" });
    }

    const data: any = {
      transcript_json: { type: 'text', text, meta },
    };

    if (sourceId) data.cliente_id = sourceId;
    if (analysis !== null) data.avaliacao_json = analysis;
    if (score !== null) data.nota_qualidade = score;

    const created = await chamadaRepository.create(data);

    return res.status(200).json({ status: 'ok', created });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Webhook /text error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function handleVoice(req: Request, res: Response) {
  try {
    const payload = req.body ?? {};

    const audioId = isNonEmptyString(payload.audioId) ? payload.audioId : null;
    const transcription: unknown = payload.transcription ?? null;
    const analysis: unknown = payload.analysis ?? null;
    const score: number | null = typeof payload.score === 'number' ? payload.score : null;

    if (transcription == null) {
      return res.status(400).json({ error: "Missing required field 'transcription' in payload" });
    }

    const data: any = {
      transcript_json: { type: 'voice', transcription },
    };

    if (audioId) data.cliente_id = audioId;
    if (analysis !== null) data.avaliacao_json = analysis;
    if (score !== null) data.nota_qualidade = score;

    const created = await chamadaRepository.create(data);

    return res.status(200).json({ status: 'ok', created });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Webhook /voice error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const webhookController = { handleText, handleVoice };