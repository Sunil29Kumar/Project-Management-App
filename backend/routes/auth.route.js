
import e, { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import checkAuth from "../middlewares/authMiddleware.js";
import { loginValidations, registerValidations } from "../validators/authSchema.js";
import { validate } from "../middlewares/validateInputs.js";

const router = Router();

router.post("/register", validate(registerValidations), register)

router.post("/login", validate(loginValidations), login)

router.post("/logout", checkAuth, logout)

export default router;