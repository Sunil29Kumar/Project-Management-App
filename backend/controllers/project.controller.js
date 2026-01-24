import { projectValidations } from "../validators/projectSchema.js";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";

export const createProject = async (req, res) => {

    try {
        const { name, description, tags, status } = req.body;
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
    try {
        const userId = req.user._id;

        const projects = await Project.find({
            $or: [
                { owner: userId },
                { members: userId } // Mongoose automatic array mein check kar leta hai
            ]
        })
            .sort({ createdAt: -1 }) // Naye projects upar dikhayein
            .populate("owner", "name email"); // Owner ki basic info bhi mil jayegi

        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            projects
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while fetching projects"
        });
    }
}


export const updateProjectById = async (req, res) => {

    try {
        const { projectId } = req.params;
        const updateData = req.body;
        const userId = req.user._id;

        // Check if project exists and user has permission
        const updatedProject = await Project.findOneAndUpdate(
            { _id: projectId, owner: userId },
            { $set: updateData }, { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({
                success: false,
                message: "Project not found or you do not have permission to update it"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Project updated successfully",
            updatedProject
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while updating project"
        });
    }

}



export const deleteProjectById = async (req, res) => {
    const { projectId } = req.params;
    try {
        const userId = req.user._id;
        const project = await Project.findOneAndDelete({ _id: projectId, userId: userId });
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found or you do not have permission to delete it"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error while deleting project"
        });
    }
}

