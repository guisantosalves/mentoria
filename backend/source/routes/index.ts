import express from "express";
import { DepController, UserController } from "../controllers";
import { LoginController } from "../controllers";
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

export default router;
