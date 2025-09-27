import path from 'path';
import fs from 'fs/promises';
import { createReadStream } from 'fs';

type TranscriptionResult = {
  text: string;
};

export async function transcribeLocalAudioFilePTBR(localFilePath: string): Promise<TranscriptionResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required');
  }

  // Lazy import to avoid adding type dep
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const OpenAI = require('openai');
  const client = new OpenAI({ apiKey });

  const filename = path.basename(localFilePath);

  // Ensure file exists before streaming
  await fs.access(localFilePath);

  const fileStream = createReadStream(localFilePath);

  const response = await client.audio.transcriptions.create({
    file: fileStream as unknown as File,
    model: 'gpt-4o-mini-transcribe',
    // Portuguese (Brazil)
    language: 'pt',
    // Hints can help diarization/accent; keep concise
    prompt: 'Idioma: Português do Brasil. Transcreva com pontuação natural.',
    // Set response format to json transcript text
    // Some SDKs infer defaults; specifying to be explicit
    response_format: 'json',
    temperature: 0.2,
  } as any);

  // SDK returns { text } for transcriptions
  return { text: (response as any).text ?? '' };
}
