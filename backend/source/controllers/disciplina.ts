import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Disciplina {
  getDisciplina(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.disciplina.findMany({ where: {} });
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

  getDisciplinaById(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.disciplina.findFirst({
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

  getDisciplinaAndMentorias(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.disciplina.findMany({
        include: {
          mentorias: true,
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

  createDisciplina(req: Request, res: Response, next: NextFunction) {
    const dataToInsert = req.body;

    (async () => {
      const data = await prisma.disciplina.create({
        data: {
          nome: dataToInsert.nome,
          data_fim: dataToInsert.data_fim,
          data_inicio: dataToInsert.data_inicio,
          descricao: dataToInsert.descricao,
          cursoId: dataToInsert.cursoId,
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

  updateDisciplina(req: Request, res: Response, next: NextFunction) {
    const dataToUpdate = req.body;
    const idFromParam = req.params.id;

    (async () => {
      const isDisciplinaExist = await prisma.disciplina.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isDisciplinaExist) {
        res.status(400).json({ message: "course not found" });
        return;
      }

      // deleting the relation to overwrite
      if (dataToUpdate.usuarios) {
        await prisma.usuario_Disciplinas.deleteMany({
          where: {
            disciplinaId: idFromParam ? Number(idFromParam) : dataToUpdate.id,
          },
        });
      }

      const data = await prisma.disciplina.update({
        where: {
          id: idFromParam ? Number(idFromParam) : dataToUpdate.id,
        },
        data: {
          nome: dataToUpdate.nome,
          data_fim: dataToUpdate.data_fim,
          data_inicio: dataToUpdate.data_inicio,
          descricao: dataToUpdate.descricao,
          cursoId: dataToUpdate.cursoId,
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

  deleteDisciplina(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;

    (async () => {
      const isDisciplinaExist = await prisma.disciplina.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isDisciplinaExist) {
        res.status(400).json({ message: "course not found" });
        return;
      }

      const data = await prisma.disciplina.delete({
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
