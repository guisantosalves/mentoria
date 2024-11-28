import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class User {
  getUser(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.usuario.findMany({ where: {} });
      if (data != null) {
        for (const item of data) {
          //@ts-ignore
          delete item.senha;
        }
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
        //@ts-ignore
        delete data.senha;
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
    const dataToInsert = req.body;

    // TIPO -> 0 - ALUNO / 1 - MENTOR / 2 - ADMIN
    (async () => {
      const hashedPassword = await bcrypt.hash(dataToInsert.senha, 10);

      const data = await prisma.usuario.create({
        data: {
          nome: dataToInsert.nome,
          CPF: dataToInsert.cpf,
          email: dataToInsert.email,
          foto: dataToInsert.foto,
          RG: dataToInsert.rg,
          senha: hashedPassword,
          curso: {
            connect: {
              id: dataToInsert.cursoId,
            },
          },
          tipo: dataToInsert.tipo,
          disciplinas: {
            createMany: {
              data: [
                ...(dataToInsert.disciplinas
                  ? dataToInsert.disciplinas.map((item: any) => ({
                      disciplinaId: item,
                    }))
                  : []),
              ],
            },
          },
          mentorias: {
            createMany: {
              data: [
                ...(dataToInsert.mentorias
                  ? dataToInsert.mentorias.map((item: any) => ({
                      mentoriaId: item,
                    }))
                  : []),
              ],
            },
          },
        },
      });
      if (data) {
        res.status(200).json({ message: "Data inserted successfully" });
      } else {
        res.status(400).json({ message: "error inserting data" });
      }
    })()
      .catch((e) => {
        res.status(400).json({ message: "database error" });
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }

  updateUser(req: Request, res: Response, next: NextFunction) {
    const dataToUpdate = req.body;
    const idFromParam = req.params.id;

    // TIPO -> 0 - ALUNO / 1 - MENTOR / 2 - ADMIN
    (async () => {
      const isUserExist = await prisma.usuario.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isUserExist) {
        res.status(400).json({ message: "user not found" });
        return;
      }

      const data = await prisma.usuario.update({
        where: {
          id: idFromParam ? Number(idFromParam) : dataToUpdate.id,
        },
        data: {
          nome: dataToUpdate.nome,
          CPF: dataToUpdate.cpf,
          email: dataToUpdate.email,
          foto: dataToUpdate.foto,
          RG: dataToUpdate.rg,
          curso: {
            connect: {
              id: dataToUpdate.cursoId,
            },
          },
          tipo: dataToUpdate.tipo,
          disciplinas: {
            createMany: {
              data: [
                ...(dataToUpdate.disciplinas
                  ? dataToUpdate.disciplinas.map((item: any) => ({
                      disciplinaId: item,
                    }))
                  : []),
              ],
            },
          },
          mentorias: {
            createMany: {
              data: [
                ...(dataToUpdate.mentorias
                  ? dataToUpdate.mentorias.map((item: any) => ({
                      mentoriaId: item,
                    }))
                  : []),
              ],
            },
          },
        },
      });
      if (data) {
        res.status(200).json({ message: "Data updated successfully" });
      } else {
        res.status(400).json({ message: "error updating data" });
      }
    })()
      .catch((e) => {
        res.status(400).json({ message: "database error" });
        throw e;
      })
      .finally(async () => {
        await prisma.$disconnect();
      });
  }

  deleteUser(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;

    (async () => {
      const data = await prisma.usuario.delete({
        where: {
          id: Number(idFromParam),
        },
      });
      if (data) {
        res.status(200).json({ message: "Data deleted successfully" });
      } else {
        res.status(400).json({ message: "error updating data" });
      }
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
