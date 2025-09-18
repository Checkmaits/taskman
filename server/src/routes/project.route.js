import { Router } from "express";
import * as controller from "../controllers/project.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authMiddleware, controller.getProjects);

export default router;
