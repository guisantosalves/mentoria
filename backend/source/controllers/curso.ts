import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Curso {
  getCurso(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.curso.findMany({ where: {} });
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

  getCursoAndDisciplinas(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.curso.findMany({
        include: { Disciplina: true },
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

  getCursoById(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.curso.findFirst({
        where: { id: Number(idFromParam) },
        include: {
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

  createCurso(req: Request, res: Response, next: NextFunction) {
    const dataToInsert = req.body;

    // tipo -> 1 - presencial | 2 - online | 3 - híbrido
    // nível -> 1: Médio | 2: Superior | 3: Pós-graduação

    (async () => {
      const data = await prisma.curso.create({
        data: {
          localizacao: dataToInsert.localizacao,
          nivel: dataToInsert.nivel,
          nome: dataToInsert.nome,
          status: dataToInsert.status,
          tipo: dataToInsert.tipo,
          departamentos: {
            createMany: {
              data: [
                ...(dataToInsert.departamentos
                  ? dataToInsert.departamentos.map((item: any) => ({
                      departamentoId: item,
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

  updateCurso(req: Request, res: Response, next: NextFunction) {
    const dataToUpdate = req.body;
    const idFromParam = req.params.id;

    (async () => {
      const isCursoExist = await prisma.curso.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isCursoExist) {
        res.status(400).json({ message: "course not found" });
        return;
      }

      // deleting the relation to overwrite
      if (dataToUpdate.departamentos) {
        await prisma.curso_Departamento.deleteMany({
          where: {
            cursoId: idFromParam ? Number(idFromParam) : dataToUpdate.id,
          },
        });
      }

      const data = await prisma.curso.update({
        where: {
          id: idFromParam ? Number(idFromParam) : dataToUpdate.id,
        },
        data: {
          localizacao: dataToUpdate.localizacao,
          nivel: dataToUpdate.nivel,
          nome: dataToUpdate.nome,
          status: dataToUpdate.status,
          tipo: dataToUpdate.tipo,
          departamentos: {
            createMany: {
              data: [
                ...(dataToUpdate.departamentos
                  ? dataToUpdate.departamentos.map((item: any) => ({
                      departamentoId: item,
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

  deleteCurso(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;

    (async () => {
      const isCursoExist = await prisma.curso.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isCursoExist) {
        res.status(400).json({ message: "course not found" });
        return;
      }

      const data = await prisma.curso.delete({
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
