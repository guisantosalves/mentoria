import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { join } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export class User {
  getUser(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.usuario.findMany({
        relationLoadStrategy: "join",
        where: {},
      });
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

  getUserByIdWithMentoria(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.usuario.findFirst({
        where: { id: Number(idFromParam) },
        include: { mentorias: { include: { mentoria: true } } },
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

  async createUser(req: Request, res: Response, next: NextFunction) {
    const {
      nome,
      email,
      senha,
      cpf,
      rg,
      foto,
      cursoId,
      tipo,
      disciplinas = [],
      mentorias = [],
    } = req.body;
  
    if (!nome || !email || !senha) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios!" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(senha, 10);
  
      const userData: any = {
        nome,
        email,
        senha: hashedPassword,
        CPF: cpf || undefined,
        RG: rg || undefined,
        foto: foto || undefined,
        tipo: tipo ?? undefined,
      };
  
      if (cursoId) {
        userData.curso = {
          connect: { id: cursoId },
        };
      }
  
      if (disciplinas.length > 0) {
        userData.disciplinas = {
          createMany: {
            data: disciplinas.map((disciplinaId: number) => ({
              disciplinaId,
            })),
          },
        };
      }
  
      if (mentorias.length > 0) {
        userData.mentorias = {
          createMany: {
            data: mentorias.map((mentoriaId: number) => ({
              mentoriaId,
            })),
          },
        };
      }
  
      const data = await prisma.usuario.create({
        data: userData,
      });
  
      return res.status(200).json({
        message: "Usuário criado com sucesso!",
        data,
      });
    } catch (e) {
      console.error("Erro no createUser:", e);
      return res.status(500).json({
        message: "Erro interno ao criar usuário",
        error: e instanceof Error ? e.message : "Erro desconhecido",
      });
    } finally {
      await prisma.$disconnect();
    }
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

      // deleting the relation to overwrite
      if (dataToUpdate.disciplinas) {
        await prisma.usuario_Disciplinas.deleteMany({
          where: {
            usuarioId: idFromParam ? Number(idFromParam) : dataToUpdate.id,
          },
        });
      }

      // deleting the relation to overwrite
      if (dataToUpdate.mentorias) {
        await prisma.usuario_Mentoria.deleteMany({
          where: {
            usuarioId: idFromParam ? Number(idFromParam) : dataToUpdate.id,
          },
        });
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
      const isUserExist = await prisma.usuario.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isUserExist) {
        res.status(400).json({ message: "user not found" });
        return;
      }

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
