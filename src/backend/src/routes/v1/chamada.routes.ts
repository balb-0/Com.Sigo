import { Router } from 'express';
import { chamadaController } from '../../controllers/chamada.controller';

export const chamadaRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Chamadas
 *     description: Endpoints para gerenciar chamadas
 */

/**
 * @openapi
 * /v1/chamadas:
 *   get:
 *     summary: Lista todas as chamadas
 *     tags: [Chamadas]
 *     responses:
 *       200:
 *         description: Lista de chamadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Cria uma nova chamada a partir de um JSON
 *     tags: [Chamadas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Chamada criada
 *       400:
 *         description: Requisição inválida
 */
chamadaRouter.get('/', chamadaController.list);
chamadaRouter.get('/:id', chamadaController.getById);
chamadaRouter.post('/', chamadaController.create);

/**
 * @openapi
 * /v1/chamadas/{id}:
 *   get:
 *     summary: Busca uma chamada pelo ID
 *     tags: [Chamadas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chamada encontrada
 *       404:
 *         description: Não encontrada
 */
