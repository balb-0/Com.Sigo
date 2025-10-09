import { Router } from 'express';
import { upload } from '../../middleware/upload';
import path from 'path';

export const uploadRouter = Router();

/**
 * @openapi
 * tags:
 *   - name: Upload
 *     description: Upload de arquivos de áudio
 */

/**
 * @openapi
 * /v1/upload/audio:
 *   post:
 *     summary: Faz upload de um arquivo de áudio
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Upload bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 */
uploadRouter.post('/audio', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const filename = req.file.filename;
  const url = `/uploads/${filename}`;
  res.status(201).json({ url, filename, originalname: req.file.originalname, size: req.file.size, mimetype: req.file.mimetype });
});
