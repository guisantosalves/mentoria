import { Usuario } from "../../../types/types";
import { usuarioRepo } from "../repository";

export class UsuarioService {
  async getAllUsers(): Promise<Usuario[]> {
    return await usuarioRepo.getAllUsers();
  }

  async getUserById(id: string): Promise<Usuario> {
    return await usuarioRepo.getUserById(id);
  }

  async createUser(data: Usuario) {
    return await usuarioRepo.createUser(data);
  }

  async updateUser(data: Usuario, id: string) {
    return await usuarioRepo.updateUser(data, id);
  }

  async deleteUser(id: string) {
    return await usuarioRepo.deleteUser(id);
  }
}
