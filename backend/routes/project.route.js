
import express, { Router } from "express";
import { createProject, deleteProjectById, getAllProjects, updateProjectById } from "../controllers/project.controller.js";
import checkAuth from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateInputs.js";
import { projectValidations } from "../validators/projectSchema.js";

const router = Router();

// create project
router.post("/create", validate(projectValidations), checkAuth, createProject)

// get all projects
router.get("/", checkAuth, getAllProjects)

// Update Project by Id
router.put("/:projectId", checkAuth, validate(projectValidations), updateProjectById)

// delete project
router.delete("/:projectId", checkAuth, deleteProjectById)

export default router;