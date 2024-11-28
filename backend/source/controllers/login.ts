import { PrismaClient } from "@prisma/client";
import { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class Login {
  logging(req: Request, res: Response, next: NextFunction) {
    (async () => {
      const userInfo = req.body;
      const { email, senha } = userInfo;

      const isUserExist = await prisma.usuario.findFirst({
        where: { email: email },
      });

      if (!isUserExist) {
        res.status(404).json({
          status: 404,
          success: false,
          message: "User not found",
        });
        return;
      }

      // password, storedPassword
      const passwordMatched = await bcrypt.compare(senha, isUserExist.senha);

      if (!passwordMatched) {
        res.status(400).json({
          status: 400,
          success: false,
          message: "wrong password",
        });
        return;
      }

      const token = jwt.sign(
        { id: isUserExist.id, email: isUserExist.email },
        process.env.SECRET_JWT as string,
        {
          expiresIn: "1d",
        }
      );

      // send token
      res.status(200).json({
        status: 200,
        success: true,
        message: "login success",
        token: token,
      });
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
