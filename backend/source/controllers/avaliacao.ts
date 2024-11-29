import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class Avaliacao {
  getAvaliacao(req: Request, res: Response, next: NextFunction) {
    (async () => {
      // executing query
      const data = await prisma.avaliacao.findMany({ where: {} });
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

  getAvaliacaoByMentoria(req: Request, res: Response, next: NextFunction) {
    (async () => {
      const mentoriaIdFromRequest = req.params.mentoriaId;
      // executing query
      const data = await prisma.avaliacao.findMany({
        where: { mentoriaId: Number(mentoriaIdFromRequest) },
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

  getAvaliacaoById(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;
    (async () => {
      const data = await prisma.avaliacao.findFirst({
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

  createAvaliacao(req: Request, res: Response, next: NextFunction) {
    const dataToInsert = req.body;

    (async () => {
      const data = await prisma.avaliacao.create({
        data: {
          comentario: dataToInsert.comentario,
          nota_geral: dataToInsert.nota_geral,
          recomendaria: dataToInsert.recomendaria,
          mentoriaId: dataToInsert.mentoriaId,
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

  updateAvaliacao(req: Request, res: Response, next: NextFunction) {
    const dataToUpdate = req.body;
    const idFromParam = req.params.id;

    (async () => {
      const isAvaliacaExist = await prisma.avaliacao.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isAvaliacaExist) {
        res.status(400).json({ message: "rate not found" });
        return;
      }

      const data = await prisma.avaliacao.update({
        where: {
          id: idFromParam ? Number(idFromParam) : dataToUpdate.id,
        },
        data: {
          comentario: dataToUpdate.comentario,
          nota_geral: dataToUpdate.nota_geral,
          recomendaria: dataToUpdate.recomendaria,
          mentoriaId: dataToUpdate.mentoriaId,
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

  deleteAvaliacao(req: Request, res: Response, next: NextFunction) {
    const idFromParam = req.params.id;

    (async () => {
      const isAvaExist = await prisma.avaliacao.findFirst({
        where: { id: Number(idFromParam) },
      });

      if (!isAvaExist) {
        res.status(400).json({ message: "rate not found" });
        return;
      }

      const data = await prisma.avaliacao.delete({
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
