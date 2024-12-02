import { Mentoria } from "../../../types/types";
import { mentoriaRepo } from "../repository";

export class MentoriaService {
  async getAllmentorias(): Promise<Mentoria[]> {
    return await mentoriaRepo.getAllMentoria();
  }

  async getMentoriaAndUsers(mentoriaId: string) {
    return await mentoriaRepo.getMentoriaAndUsers(mentoriaId);
  }

  async getmentoriaById(id: string): Promise<Mentoria> {
    return await mentoriaRepo.getMentoriaById(id);
  }

  async creatementoria(data: Mentoria) {
    return await mentoriaRepo.createMentoria(data);
  }

  async updatementoria(data: Mentoria, id: string) {
    return await mentoriaRepo.updateMentoria(data, id);
  }

  async deletementoria(id: string) {
    return await mentoriaRepo.deleteMentoria(id);
  }
}
