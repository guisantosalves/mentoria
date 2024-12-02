import { Login } from "../../../types/types";
import { loginRepo } from "../repository";

export class LoginService {
  async logging(data: Login) {
    return await loginRepo.logging(data);
  }
}
