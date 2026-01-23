
import e, { Router } from "express";
import { login, logout ,register} from "../controllers/auth.controller.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register)

router.post("/login",login)

router.post("/logout", checkAuth, logout)

export default router;