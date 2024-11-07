import express from "express";
import { UserController } from "../controllers";

const router = express.Router();

// usuario
router.get("/usuario", UserController.getUser);

export default router;
