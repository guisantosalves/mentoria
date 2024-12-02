import { Avaliacao, Departamento } from "../../../types/types";
import { avaliacaoRepo } from "../repository";

export class AvaliacaoService {
  async getAllRates(): Promise<Avaliacao[]> {
    return await avaliacaoRepo.getAllRates();
  }

  async getRatesByMentoria(mentoriaId: string): Promise<Avaliacao[]> {
    return await avaliacaoRepo.getRatesByMentoria(mentoriaId);
  }

  async getRateById(id: string): Promise<Avaliacao> {
    return await avaliacaoRepo.getRateById(id);
  }

  async createRate(data: Avaliacao) {
    return await avaliacaoRepo.createRate(data);
  }

  async updateRate(data: Avaliacao, id: string) {
    return await avaliacaoRepo.updateRate(data, id);
  }

  async deleteRate(id: string) {
    return await avaliacaoRepo.deleteRate(id);
  }
}
