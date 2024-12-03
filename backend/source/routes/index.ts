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
router.get("/usuario/:id/mentoria", auth, UserController.getUserByIdWithMentoria);
// create user does not need auth
router.post("/usuario", UserController.createUser);
router.put("/usuario/:id", auth, UserController.updateUser);
router.delete("/usuario/:id", auth, UserController.deleteUser);

// departamento
router.get("/departamento", auth, DepController.getDepartamento);
router.get("/departamento/:id", auth, DepController.getDepById);
router.post("/departamento", auth, DepController.createDep);
router.put("/departamento/:id", auth, DepController.updateDep);
router.delete("/departamento/:id", auth, DepController.deleteDep);

// avaliacao
router.get("/avaliacao", auth, AvaliacaoController.getAvaliacao);
router.get("/avaliacao/:id", auth, AvaliacaoController.getAvaliacaoById);
router.get(
  "/avaliacao/mentoria/:mentoriaId",
  auth,
  AvaliacaoController.getAvaliacaoByMentoria
);
router.post("/avaliacao", auth, AvaliacaoController.createAvaliacao);
router.put("/avaliacao/:id", auth, AvaliacaoController.updateAvaliacao);
router.delete("/avaliacao/:id", auth, AvaliacaoController.deleteAvaliacao);

// curso
router.get("/curso", auth, CursoController.getCurso);
router.get("/curso/disciplina", auth, CursoController.getCursoAndDisciplinas);
router.get("/curso/:id", auth, CursoController.getCursoById);
router.post("/curso", auth, CursoController.createCurso);
router.put("/curso/:id", auth, CursoController.updateCurso);
router.delete("/curso/:id", auth, CursoController.deleteCurso);

// disciplina
router.get("/disciplina", auth, DisciplinaController.getDisciplina);
router.get(
  "/disciplina/mentoria",
  auth,
  DisciplinaController.getDisciplinaAndMentorias
);
router.get("/disciplina/:id", auth, DisciplinaController.getDisciplinaById);
router.post("/disciplina", auth, DisciplinaController.createDisciplina);
router.put("/disciplina/:id", auth, DisciplinaController.updateDisciplina);
router.delete("/disciplina/:id", auth, DisciplinaController.deleteDisciplina);

// mentoria
router.get("/mentoria", auth, MentoriaController.getMentoria);
router.get("/mentoria/:id", auth, MentoriaController.getMentoriaById);
router.get(
  "/mentoria/:id/details",
  auth,
  MentoriaController.getMentoriaByIdComplete
);
router.post("/mentoria", auth, MentoriaController.createMentoria);
router.put("/mentoria/:id", auth, MentoriaController.updateMentoria);
router.delete("/mentoria/:id", auth, MentoriaController.deleteMentoria);

export default router;
