
import express, { Router } from "express";
import { createProject, deleteProjectById, getAllProjects } from "../controllers/project.controller.js";

const router = Router();

// create project
router.post("/create", createProject)

// get all projects
router.get("/",getAllProjects)

// delete project
router.delete("/:projectId",deleteProjectById)

export default router;