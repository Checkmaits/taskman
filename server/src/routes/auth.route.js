import { Router } from "express";
import * as controller from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, (req, res) => {
  const user = req.user;
  delete user.password;
  res.status(200).json({
    message: "User information retrieved successfully ✅",
    data: user,
  });
});

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/logout", controller.logout);
router.post("/refresh", controller.refresh);

export default router;
