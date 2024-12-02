import { Departamento } from "../../../types/types";
import { departamentoRepo } from "../repository";

export class DepartamentoService {
  async getAllDepartments(): Promise<Departamento[]> {
    return await departamentoRepo.getAllDepartments();
  }

  async getDepartmentById(id: string): Promise<Departamento> {
    return await departamentoRepo.getDepartmentById(id);
  }

  async createDepartment(data: Departamento) {
    return await departamentoRepo.createDepartment(data);
  }

  async updateDepartment(data: Departamento, id: string) {
    return await departamentoRepo.updateDepartment(data, id);
  }

  async deleteDepartment(id: string) {
    return await departamentoRepo.deleteDepartment(id);
  }
}
