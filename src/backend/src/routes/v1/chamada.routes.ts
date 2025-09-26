import { Router } from 'express';
import { chamadaController } from '../../controllers/chamada.controller';

export const chamadaRouter = Router();

chamadaRouter.get('/', chamadaController.list);
chamadaRouter.get('/:id', chamadaController.getById);
chamadaRouter.post('/', chamadaController.create);
