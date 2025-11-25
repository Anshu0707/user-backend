import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected test route
router.get("/me", authMiddleware, (req, res) => {
  res.json({ message: "Authenticated", user: req.user });
});

export default router;
