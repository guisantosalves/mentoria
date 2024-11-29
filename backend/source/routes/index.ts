import express from "express";
import {
  AvaliacaoController,
  DepController,
  UserController,
  LoginController,
  CursoController,
  DisciplinaController,
  MentoriaController,
} from "../controllers";
import { auth } from "../middleware/auth";

const router = express.Router();

// login
router.post("/login", LoginController.logging);

// usuario
router.get("/usuario", auth, UserController.getUser);
router.get("/usuario/:id", auth, UserController.getUserById);
router.post("/usuario", auth, UserController.createUser);
router.put("/usuario/:id", auth, UserController.updateUser);
router.delete("/usuario/:id", auth, UserController.deleteUser);

// departamento
router.get("/departamento", DepController.getDepartamento);
router.get("/departamento/:id", DepController.getDepById);
router.post("/departamento", DepController.createDep);
router.put("/departamento/:id", DepController.updateDep);
router.delete("/departamento/:id", DepController.deleteDep);

// avaliacao
router.get("/avaliacao", AvaliacaoController.getAvaliacao);
router.get("/avaliacao/:id", AvaliacaoController.getAvaliacaoById);
router.get(
  "/avaliacao/mentoria/:mentoriaId",
  AvaliacaoController.getAvaliacaoByMentoria
);
router.post("/avaliacao", AvaliacaoController.createAvaliacao);
router.put("/avaliacao/:id", AvaliacaoController.updateAvaliacao);
router.delete("/avaliacao/:id", AvaliacaoController.deleteAvaliacao);

// curso
router.get("/curso", CursoController.getCurso);
router.get("/curso/disciplina", CursoController.getCursoAndDisciplinas);
router.get("/curso/:id", CursoController.getCursoById);
router.post("/curso", CursoController.createCurso);
router.put("/curso/:id", CursoController.updateCurso);
router.delete("/curso/:id", CursoController.deleteCurso);

// disciplina
router.get("/disciplina", DisciplinaController.getDisciplina);
router.get(
  "/disciplina/mentoria",
  DisciplinaController.getDisciplinaAndMentorias
);
router.get("/disciplina/:id", DisciplinaController.getDisciplinaById);
router.post("/disciplina", DisciplinaController.createDisciplina);
router.put("/disciplina/:id", DisciplinaController.updateDisciplina);
router.delete("/disciplina/:id", DisciplinaController.deleteDisciplina);

// mentoria
router.get("/mentoria", MentoriaController.getMentoria);
router.get("/mentoria/:id", MentoriaController.getMentoriaById);
router.get("/mentoria/:id/details", MentoriaController.getMentoriaByIdComplete);
router.post("/mentoria", MentoriaController.createMentoria);
router.put("/mentoria/:id", MentoriaController.updateMentoria);
router.delete("/mentoria/:id", MentoriaController.deleteMentoria);

export default router;
