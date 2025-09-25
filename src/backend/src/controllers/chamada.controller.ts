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

async function create(req: Request, res: Response) {
  try {
    const jsonData = req.body;
    
    if (!jsonData || Object.keys(jsonData).length === 0) {
      return res.status(400).json({ error: 'Dados JSON não fornecidos no body da requisição' });
    }

    console.log('Recebendo dados para criar chamada:', JSON.stringify(jsonData, null, 2));
    
    const row = await chamadaService.createFromJson(jsonData);
    res.status(201).json(row);
  } catch (error) {
    console.error('Error creating chamada:', error);
    
    if (error instanceof Error) {
      res.status(400).json({ 
        error: error.message,
        details: 'Verifique se o JSON contém todos os campos obrigatórios: meta, results, totalBilledTime'
      });
    } else {
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export const chamadaController = { list, getById, create };
