import { Disciplina } from "../../../types/types";
import { disciplinaRepo } from "../repository";

export class DisciplinaService {
  async getAllDisciplinas(): Promise<Disciplina[]> {
    return await disciplinaRepo.getAllDisciplinas();
  }

  async getDisciplinasAndMentoria() {
    return await disciplinaRepo.getDisciplinasAndMentoria();
  }

  async getDisciplinaById(id: string): Promise<Disciplina> {
    return await disciplinaRepo.getDisciplinaById(id);
  }

  async createDisciplina(data: Disciplina) {
    return await disciplinaRepo.createDisciplina(data);
  }

  async updateDisciplina(data: Disciplina, id: string) {
    return await disciplinaRepo.updateDisciplina(data, id);
  }

  async deleteDisciplina(id: string) {
    return await disciplinaRepo.deleteDisciplina(id);
  }
}
