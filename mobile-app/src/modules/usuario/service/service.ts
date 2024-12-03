import { Usuario } from "../../../types/types";
import { usuarioRepo } from "../repository";

export class UsuarioService {
  async getAllUsers(token: string): Promise<Usuario[]> {
    return await usuarioRepo.getAllUsers(token);
  }

  async getUserByIdAndMentorias(userId: string, token: string) {
    return await usuarioRepo.getUserByIdAndMentorias(userId, token);
  }

  async getUserById(id: string, token: string): Promise<Usuario> {
    return await usuarioRepo.getUserById(id, token);
  }

  async createUser(data: Usuario, token: string) {
    return await usuarioRepo.createUser(data);
  }

  async updateUser(data: Usuario, id: string, token: string) {
    return await usuarioRepo.updateUser(data, id, token);
  }

  async deleteUser(id: string, token: string) {
    return await usuarioRepo.deleteUser(id, token);
  }
}
