import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class Departamento {
  getDepartamento(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.departamento.findMany({ where: {} });
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

  getDepById(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.departamento.findFirst({
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

  createDep(req: Request, res: Response, next: NextFunction) {
    const dataToInsert = req.body;

    (async () => {
      const data = await prisma.departamento.create({
        data: {
          nome: dataToInsert.nome,
          descricao: dataToInsert.descricao,
          telefone: dataToInsert.telefone,
          cursos: {
            createMany: {
              data: [
                ...(dataToInsert.cursos
                  ? dataToInsert.cursos.map((item: any) => ({ cursoId: item }))
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

  updateDep(req: Request, res: Response, next: NextFunction) {
    const dataToUpdate = req.body;
    const idFromParam = req.params.id;

    (async () => {
      const isDepExist = await prisma.departamento.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isDepExist) {
        res.status(400).json({ message: "department not found" });
        return;
      }
      
      // deleting the relation to overwrite
      if (dataToUpdate.cursos) {
        await prisma.curso_Departamento.deleteMany({
          where: {
            departamentoId: idFromParam ? Number(idFromParam) : dataToUpdate.id,
          },
        });
      }

      const data = await prisma.departamento.update({
        where: {
          id: idFromParam ? Number(idFromParam) : dataToUpdate.id,
        },
        data: {
          nome: dataToUpdate.nome,
          descricao: dataToUpdate.descricao,
          telefone: dataToUpdate.telefone,
          cursos: {
            createMany: {
              data: [
                ...(dataToUpdate.cursos
                  ? dataToUpdate.cursos.map((item: any) => ({
                      cursoId: item,
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

  deleteDep(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;

    (async () => {
      const isDepExist = await prisma.departamento.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isDepExist) {
        res.status(400).json({ message: "department not found" });
        return;
      }

      const data = await prisma.departamento.delete({
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
