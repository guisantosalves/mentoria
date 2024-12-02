import { Login, LoginResponse } from "../../../types/types";
import { API_PORT } from "../../info";
import { API_URL } from "../../info";

export class LoginRepository {
  async logging(data: Login): Promise<LoginResponse> {
    return fetch(`${API_URL}:${API_PORT}/login`, {
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
}
