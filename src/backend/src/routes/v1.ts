import { Router } from 'express';
import { chamadaRouter } from '../routes/v1/chamada.routes';
import { uploadRouter } from '../routes/v1/upload.routes';
import { transcriptionRouter } from '../routes/v1/transcription.routes';
import { nlRouter } from '../routes/v1/nl.routes';

export const v1Router = Router();

v1Router.use('/chamadas', chamadaRouter);
v1Router.use('/upload', uploadRouter);
v1Router.use('/transcribe', transcriptionRouter);
v1Router.use('/nl', nlRouter);
