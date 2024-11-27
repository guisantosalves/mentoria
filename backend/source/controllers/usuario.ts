import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class User {
  getUser(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.usuario.findMany({ where: {} });
      if (data != null) {
        res.status(200).json(data);
        return;
      }
      res.status(200).json({ message: "there is no data" });
    })()
      .catch((e) => {
        res.status(400).json({ message: "database error" });
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
  getUserById(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.usuario.findFirst({
        where: { id: Number(idFromParam) },
      });
      if (data != null) {
        res.status(200).json(data);
        return;
      }
      res.status(200).json({ message: "there is no data" });
    })()
      .catch((e) => {
        res.status(400).json({ message: "database error" });
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
  createUser(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // const data = await prisma.usuario.create();
      // res.status(200).json(data);
    })()
      .catch((e) => {
        res.status(400).json({ message: "database error" });
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }
}

export default User;
