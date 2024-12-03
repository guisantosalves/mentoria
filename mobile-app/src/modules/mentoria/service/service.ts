import { Mentoria } from "../../../types/types";
import { mentoriaRepo } from "../repository";

export class MentoriaService {
  async getAllmentorias(token: string): Promise<Mentoria[]> {
    return await mentoriaRepo.getAllMentoria(token);
  }

  async getMentoriaAndUsers(mentoriaId: string, token: string) {
    return await mentoriaRepo.getMentoriaAndUsers(mentoriaId, token);
  }

  async getmentoriaById(id: string, token: string): Promise<Mentoria> {
    return await mentoriaRepo.getMentoriaById(id, token);
  }

  async creatementoria(data: Mentoria, token: string) {
    return await mentoriaRepo.createMentoria(data, token);
  }

  async updatementoria(data: Mentoria, id: string, token: string) {
    return await mentoriaRepo.updateMentoria(data, id, token);
  }

  async deletementoria(id: string, token: string) {
    return await mentoriaRepo.deleteMentoria(id, token);
  }
}
