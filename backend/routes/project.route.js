
import express, { Router } from "express";
import { addCommentToTask, createProject, createTask, deleteProjectById, deleteTaskById, getAllProjects, getAllProjectTasks, getCommentsForTask, getTasks, inviteMemberToProject, respondToInvitation, updateProjectById, updateTaskById } from "../controllers/project.controller.js";
import checkAuth from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateInputs.js";
import { projectValidations } from "../validators/projectSchema.js";
import { createTaskValidations, updateTaskValidations } from "../validators/taskSchema.js";

const router = Router();

// ============ PROJECT ROUTES =============

// create project
router.post("/create", validate(projectValidations), checkAuth, createProject)

// get all projects
router.get("/", checkAuth, getAllProjects)

// Update Project by Id
router.put("/:projectId", checkAuth, validate(projectValidations), updateProjectById)

// delete project
router.delete("/:projectId", checkAuth, deleteProjectById)

// Invite member to project
router.post("/:projectId/invite", checkAuth, inviteMemberToProject)

// Accept or Reject Invitation
router.post("/invitations/:token/respond", checkAuth, respondToInvitation)

// =========================================



// ================= TASK =================== 

// Create a new task
router.post("/:projectId/tasks", checkAuth, validate(createTaskValidations), createTask)

// Get all Project Tasks 
router.get("/tasks", checkAuth, getAllProjectTasks)

// Get all tasks for a project
router.get("/:projectId/tasks", checkAuth, getTasks)


// Update Task by Id
router.put("/tasks/:taskId", checkAuth, validate(updateTaskValidations), updateTaskById)


// Delete Task by Id
router.delete("/tasks/:taskId", checkAuth, deleteTaskById)


// Add comment to task 
router.post("/tasks/:taskId/comments", checkAuth, addCommentToTask)

// Get all comments for a task
router.get("/tasks/:taskId/comments", checkAuth, getCommentsForTask)


// ===========================================

export default router;