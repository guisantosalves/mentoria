import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class User {
  getUser(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.usuario.findMany({ where: {} });
      console.log(data);
      res.status(200).json(data);
    })()
      .catch((e) => {
        res.status(400).json({ message: "error" });
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
}

export default User;
