import { Request, Response, NextFunction } from "express";

class User {
  getUser(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ message: "salve" });
  }
}

export default User;
