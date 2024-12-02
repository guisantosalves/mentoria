import { Curso } from "../../../types/types";
import { cursoRepo } from "../repository";

export class CursoService {
  async getAllCourses(): Promise<Curso[]> {
    return await cursoRepo.getAllCourses();
  }

  async getAllCoursesAndDisciplinas() {
    return await cursoRepo.getCoursesAndDisciplinas();
  }

  async getCourseById(id: string): Promise<Curso> {
    return await cursoRepo.getCourseById(id);
  }

  async createCourse(data: Curso) {
    return await cursoRepo.createCourse(data);
  }

  async updateCourse(data: Curso, id: string) {
    return await cursoRepo.updateCourse(data, id);
  }

  async deleteCourse(id: string) {
    return await cursoRepo.deleteCourse(id);
  }
}
