import { Departamento } from "../../../types/types";
import { departamentoRepo } from "../repository";

export class DepartamentoService {
  async getAllDepartments(token: string): Promise<Departamento[]> {
    return await departamentoRepo.getAllDepartments(token);
  }

  async getDepartmentById(id: string, token: string): Promise<Departamento> {
    return await departamentoRepo.getDepartmentById(id, token);
  }

  async createDepartment(data: Departamento, token: string) {
    return await departamentoRepo.createDepartment(data, token);
  }

  async updateDepartment(data: Departamento, id: string, token: string) {
    return await departamentoRepo.updateDepartment(data, id, token);
  }

  async deleteDepartment(id: string, token: string) {
    return await departamentoRepo.deleteDepartment(id, token);
  }
}
