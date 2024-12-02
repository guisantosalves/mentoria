import { Avaliacao } from "../../../types/types";
import { API_PORT } from "../../info";
import { API_URL } from "../../info";

export class AvaliacaoRepository {
  async getAllRates(): Promise<Avaliacao[]> {
    return fetch(`${API_URL}:${API_PORT}/avaliacao`, {
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

  async getRatesByMentoria(mentoriaId: string): Promise<Avaliacao[]> {
    return fetch(`${API_URL}:${API_PORT}/avaliacao/mentoria/${mentoriaId}`, {
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

  async getRateById(id: string): Promise<Avaliacao> {
    return fetch(`${API_URL}:${API_PORT}/avaliacao/${id}`, {
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

  async createRate(data: Avaliacao) {
    return fetch(`${API_URL}:${API_PORT}/avaliacao`, {
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

  async updateRate(data: Avaliacao, id: string) {
    return fetch(`${API_URL}:${API_PORT}/avaliacao/${id}`, {
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

  async deleteRate(id: string) {
    return fetch(`${API_URL}:${API_PORT}/avaliacao/${id}`, {
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
