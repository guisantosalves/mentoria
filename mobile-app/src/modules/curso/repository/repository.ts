import { Curso, CursoWithDisciplina } from "../../../types/types";
import { API_PORT } from "../../info";
import { API_URL } from "../../info";

export class CursoRepository {
  async getAllCourses(): Promise<Curso[]> {
    return fetch(`${API_URL}:${API_PORT}/curso`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Endpoint Error");
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error("Error on request");
      });
  }

  async getCoursesAndDisciplinas(): Promise<CursoWithDisciplina[]> {
    return fetch(`${API_URL}:${API_PORT}/curso/disciplina`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Endpoint Error");
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error("Error on request");
      });
  }

  async getCourseById(id: string): Promise<Curso> {
    return fetch(`${API_URL}:${API_PORT}/curso/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Endpoint Error");
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error("Error on request");
      });
  }

  async createCourse(data: Curso) {
    return fetch(`${API_URL}:${API_PORT}/curso`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Endpoint Error");
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error("Error on request");
      });
  }

  async updateCourse(data: Curso, id: string) {
    return fetch(`${API_URL}:${API_PORT}/curso/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Endpoint Error");
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error("Error on request");
      });
  }

  async deleteCourse(id: string) {
    return fetch(`${API_URL}:${API_PORT}/curso/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Endpoint Error");
      })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw new Error("Error on request");
      });
  }
}
