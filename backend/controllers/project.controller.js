import { success } from "zod";
import { projectSchema } from "../validators/projectZodSchema.js";
import User from "../models/user.model.js";
import Project from "../models/project.modle.js";

export const createProject = async (req, res) => {
    // 1. Zod Validation
    const validation = projectSchema.safeParse(req.body);

    if (!validation.success) {
        return res.status(400).json({
            success: false,
            // Pehla validation error message frontend ke toast ke liye
            message: validation.error.errors[0].message,
            details: validation.error.flatten().fieldErrors
        });
    }

    const { name, description, tags, status } = validation.data;

    try {
        const userId = req.user._id;

        // 2. Extra Validation: Unique Name Check (Per User)
        const existingProject = await Project.findOne({ name, owner: userId });
        if (existingProject) {
            return res.status(400).json({
                success: false,
                message: "You already have a project with this name"
            });
        }

        // 3. Create Project
        const project = await Project.create({
            userId,
            name,
            description,
            tags,
            status,
            owner: userId,
            members: [userId]
        });

        return res.status(201).json({
            success: true,
            message: "Project Created Successfully",
            project
        });

    } catch (error) {
        console.error("Create Project Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during project creation"
        });
    }
}

export const getAllProjects = async (req, res) => {
    // logic to get all projects
}


export const deleteProjectById = async (req, res) => {
    // logic to delete a project
}

