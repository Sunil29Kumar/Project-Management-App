import express, { Router } from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import { user } from "../controllers/user.controller.js";

const router = Router();

router.get("/",checkAuth ,user)


export default router;