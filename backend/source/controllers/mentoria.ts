import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Mentoria {
  getMentoria(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.mentoria.findMany({ where: {} });
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

  getMentoriaById(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.mentoria.findFirst({
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

  getMentoriaByIdComplete(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.mentoria.findFirst({
        where: { id: Number(idFromParam) },
        include: {
          usuarios: true,
          avaliacoes: true,
          Disciplina: true,
        },
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

  createMentoria(req: Request, res: Response, next: NextFunction) {
    const dataToInsert = req.body;

    (async () => {
      // verificando se o mentor existe
      const isMentorExist = await prisma.usuario.findFirst({
        where: {
          id: dataToInsert.mentor,
        },
      });

      if (!isMentorExist) {
        res.status(400).json({ message: "course not found" });
        return;
      }

      const data = await prisma.mentoria.create({
        data: {
          nome: dataToInsert.nome,
          data_fim: dataToInsert.data_fim,
          data_inicio: dataToInsert.data_inicio,
          descricao: dataToInsert.descricao,
          localizacao: dataToInsert.localizacao,
          mentor: dataToInsert.mentor,
          disciplinaId: dataToInsert.disciplinaId,
          usuarios: {
            createMany: {
              data: [
                ...(dataToInsert.usuarios
                  ? dataToInsert.usuarios.map((item: any) => ({
                      usuarioId: item,
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

  updateMentoria(req: Request, res: Response, next: NextFunction) {
    const dataToUpdate = req.body;
    const idFromParam = req.params.id;

    (async () => {
      const isMentoriaExist = await prisma.mentoria.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isMentoriaExist) {
        res.status(400).json({ message: "mentoria not found" });
        return;
      }

      // verificando se o mentor existe
      const isMentorExist = await prisma.usuario.findFirst({
        where: {
          id: dataToUpdate.mentor,
        },
      });

      if (!isMentorExist) {
        res.status(400).json({ message: "mentor not found" });
        return;
      }

      // deleting the relation to overwrite
      if (dataToUpdate.usuarios) {
        await prisma.usuario_Mentoria.deleteMany({
          where: {
            mentoriaId: idFromParam ? Number(idFromParam) : dataToUpdate.id,
          },
        });
      }

      const data = await prisma.mentoria.update({
        where: {
          id: idFromParam ? Number(idFromParam) : dataToUpdate.id,
        },
        data: {
          nome: dataToUpdate.nome,
          data_fim: dataToUpdate.data_fim,
          data_inicio: dataToUpdate.data_inicio,
          descricao: dataToUpdate.descricao,
          localizacao: dataToUpdate.localizacao,
          mentor: dataToUpdate.mentor,
          disciplinaId: dataToUpdate.disciplinaId,
          usuarios: {
            createMany: {
              data: [
                ...(dataToUpdate.usuarios
                  ? dataToUpdate.usuarios.map((item: any) => ({
                      usuarioId: item,
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

  deleteMentoria(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;

    (async () => {
      const isMentoriaExist = await prisma.mentoria.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isMentoriaExist) {
        res.status(400).json({ message: "mentoria not found" });
        return;
      }

      const data = await prisma.mentoria.delete({
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
