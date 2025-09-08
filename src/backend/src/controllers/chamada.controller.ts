import { Request, Response } from 'express';
import { chamadaService } from '../services/chamada.service';

async function list(req: Request, res: Response) {
  const rows = await chamadaService.list();
  res.json(rows);
}

async function getById(req: Request, res: Response) {
  const { id } = req.params;
  const row = await chamadaService.getById(Number(id));
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
}

export const chamadaController = { list, getById };
