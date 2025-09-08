import { Router } from 'express';
import { upload } from '../../middleware/upload';
import path from 'path';

export const uploadRouter = Router();

uploadRouter.post('/audio', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const filename = req.file.filename;
  const url = `/uploads/${filename}`;
  res.status(201).json({ url, filename, originalname: req.file.originalname, size: req.file.size, mimetype: req.file.mimetype });
});
