import { Router } from "express";
import { createUser } from "../controllers/userController.js";

const router = Router();

router.post("/create", createUser);

export default router;
