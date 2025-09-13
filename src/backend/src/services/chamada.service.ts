import { chamadaRepository } from '../repositories/chamada.repository';

async function list() {
  return chamadaRepository.list();
}

async function getById(id: number) {
  return chamadaRepository.getById(id);
}

export const chamadaService = { list, getById };
