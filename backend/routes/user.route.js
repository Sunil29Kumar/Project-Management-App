import express, { Router } from "express";
import checkAuth from "../middlewares/authMiddleware.js";
import { changePassword,  updateProfile , user } from "../controllers/user.controller.js";

const router = Router();

router.get("/", checkAuth, user)
router.patch("/update-profile", checkAuth, updateProfile)
router.patch("/change-password", checkAuth, changePassword)
router.patch("/update-avatar", checkAuth, updateProfile)


export default router;