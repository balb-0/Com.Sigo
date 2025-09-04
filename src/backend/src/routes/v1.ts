import { Router } from 'express';
import { chamadaRouter } from '../routes/v1/chamada.routes';
import { uploadRouter } from '../routes/v1/upload.routes';

export const v1Router = Router();

v1Router.use('/chamadas', chamadaRouter);
v1Router.use('/upload', uploadRouter);
