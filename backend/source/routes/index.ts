import express from "express";
import { UserController } from "../controllers";

const router = express.Router();

// usuario
router.get("/usuario", UserController.getUser);
router.get("/usuario/:id", UserController.getUserById);

export default router;
