import { Disciplina } from "../../../types/types";
import { disciplinaRepo } from "../repository";

export class DisciplinaService {
  async getAllDisciplinas(token: string): Promise<Disciplina[]> {
    return await disciplinaRepo.getAllDisciplinas(token);
  }

  async getDisciplinasAndMentoria(token: string) {
    return await disciplinaRepo.getDisciplinasAndMentoria(token);
  }

  async getDisciplinaById(id: string, token: string): Promise<Disciplina> {
    return await disciplinaRepo.getDisciplinaById(id, token);
  }

  async createDisciplina(data: Disciplina, token: string) {
    return await disciplinaRepo.createDisciplina(data, token);
  }

  async updateDisciplina(data: Disciplina, id: string, token: string) {
    return await disciplinaRepo.updateDisciplina(data, id, token);
  }

  async deleteDisciplina(id: string, token: string) {
    return await disciplinaRepo.deleteDisciplina(id, token);
  }
}
