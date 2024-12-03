import { Avaliacao, Departamento } from "../../../types/types";
import { avaliacaoRepo } from "../repository";

export class AvaliacaoService {
  async getAllRates(token: string): Promise<Avaliacao[]> {
    return await avaliacaoRepo.getAllRates(token);
  }

  async getRatesByMentoria(
    mentoriaId: string,
    token: string
  ): Promise<Avaliacao[]> {
    return await avaliacaoRepo.getRatesByMentoria(mentoriaId, token);
  }

  async getRateById(id: string, token: string): Promise<Avaliacao> {
    return await avaliacaoRepo.getRateById(id, token);
  }

  async createRate(data: Avaliacao, token: string) {
    return await avaliacaoRepo.createRate(data, token);
  }

  async updateRate(data: Avaliacao, id: string, token: string) {
    return await avaliacaoRepo.updateRate(data, id, token);
  }

  async deleteRate(id: string, token: string) {
    return await avaliacaoRepo.deleteRate(id, token);
  }
}
