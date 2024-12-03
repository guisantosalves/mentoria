import { Curso } from "../../../types/types";
import { cursoRepo } from "../repository";

export class CursoService {
  async getAllCourses(token: string): Promise<Curso[]> {
    return await cursoRepo.getAllCourses(token);
  }

  async getAllCoursesAndDisciplinas(token: string) {
    return await cursoRepo.getCoursesAndDisciplinas(token);
  }

  async getCourseById(id: string, token: string): Promise<Curso> {
    return await cursoRepo.getCourseById(id, token);
  }

  async createCourse(data: Curso, token: string) {
    return await cursoRepo.createCourse(data, token);
  }

  async updateCourse(data: Curso, id: string, token: string) {
    return await cursoRepo.updateCourse(data, id, token);
  }

  async deleteCourse(id: string, token: string) {
    return await cursoRepo.deleteCourse(id, token);
  }
}
