import { Usuario, UsuarioAndMentoria } from "../../../types/types";
import { API_PORT } from "../../info";
import { API_URL } from "../../info";

export class UsuarioRepository {
  async getAllUsers(token: string): Promise<Usuario[]> {
    return fetch(`${API_URL}:${API_PORT}/usuario`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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

  async getUserById(id: string, token: string): Promise<Usuario> {
    return fetch(`${API_URL}:${API_PORT}/usuario/${id}`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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

  async getUserByIdAndMentorias(
    id: string,
    token: string
  ): Promise<UsuarioAndMentoria> {
    return fetch(`${API_URL}:${API_PORT}/usuario/${id}/mentoria`, {
      method: "GET",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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

  async createUser(data: Usuario) {
    return fetch(`${API_URL}:${API_PORT}/usuario`, {
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

  async updateUser(data: Usuario, id: string, token: string) {
    return fetch(`${API_URL}:${API_PORT}/usuario/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

  async deleteUser(id: string, token: string) {
    return fetch(`${API_URL}:${API_PORT}/usuario/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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
