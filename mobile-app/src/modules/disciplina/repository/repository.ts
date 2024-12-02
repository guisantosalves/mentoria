import { Disciplina, DisciplineWithMentoria } from "../../../types/types";
import { API_PORT } from "../../info";
import { API_URL } from "../../info";

export class DisciplinaRepository {
  async getAllDisciplinas(): Promise<Disciplina[]> {
    return fetch(`${API_URL}:${API_PORT}/disciplina`, {
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

  async getDisciplinasAndMentoria(): Promise<DisciplineWithMentoria[]> {
    return fetch(`${API_URL}:${API_PORT}/disciplina/mentoria`, {
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

  async getDisciplinaById(id: string): Promise<Disciplina> {
    return fetch(`${API_URL}:${API_PORT}/disciplina/${id}`, {
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

  async createDisciplina(data: Disciplina) {
    return fetch(`${API_URL}:${API_PORT}/disciplina`, {
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

  async updateDisciplina(data: Disciplina, id: string) {
    return fetch(`${API_URL}:${API_PORT}/disciplina/${id}`, {
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

  async deleteDisciplina(id: string) {
    return fetch(`${API_URL}:${API_PORT}/disciplina/${id}`, {
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
