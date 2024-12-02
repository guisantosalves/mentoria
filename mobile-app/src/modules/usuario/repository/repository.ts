import { Usuario } from "../../../types/types";
import { API_PORT } from "../../info";
import { API_URL } from "../../info";

export class UsuarioRepository {
  async getAllUsers(): Promise<Usuario[]> {
    return fetch(`${API_URL}:${API_PORT}/usuario`, {
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

  async getUserById(id: string): Promise<Usuario> {
    return fetch(`${API_URL}:${API_PORT}/usuario/${id}`, {
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

  async updateUser(data: Usuario, id: string) {
    return fetch(`${API_URL}:${API_PORT}/usuario/${id}`, {
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

  async deleteUser(id: string) {
    return fetch(`${API_URL}:${API_PORT}/usuario/${id}`, {
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
