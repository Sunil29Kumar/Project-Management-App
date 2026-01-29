import { projectValidations } from "../validators/projectSchema.js";
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import Invitation from "../models/invitation.model.js";
import { sendInvitationEmail } from "../mail/projectInviation.js";

export const createProject = async (req, res) => {

    try {
        const { name, description, tags, status } = req.body;
        const userId = req.user._id;

        // 2. Extra Validation: Unique Name Check (Per User)
        const existingProject = await Project.findOne({ name, owner: userId });
        if (existingProject) {
            return res.status(400).json({
                success: false,
                error: "You already have a project with this name"
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
            error: "Server error during project creation"
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
            error: "Server error while fetching projects"
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
                error: "Project not found or you do not have permission to update it"
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
            error: "Server error while updating project"
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
                error: "Project not found or you do not have permission to delete it"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server error while deleting project"
        });
    }
}


export const inviteMemberToProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { email } = req.body;
        const userId = req.user._id;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, error: "Project not found" });
        }

        // Check if the user is the owner of the project
        if (project.owner.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                error: "Access Denied: Only the project owner can invite members"
            });
        }


        const userToInvite = await User.findOne({ email });
        if (!userToInvite) {
            return res.status(404).json({ success: false, error: "User with this email not found" });
        }

        const token = crypto.randomUUID()

        // Update invitation model
        const invitation = await Invitation.create({
            projectId,
            invitedEmail: email,
            token,
            status: "pending",
            expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
        })

        await sendInvitationEmail(email, project.name, `${process.env.FRONTEND_URL}/accept-invite?token=${token}`)

        return res.status(200).json({
            success: true,
            message: `Invitation sent to ${email} successfully`,
            token // In real application, you would send this token via email
        });



    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server error while inviting member to project"
        });
    }
}


// Respond To Invitation
export const respondToInvitation = async (req, res) => {
    try {
        const { token } = req.params;
        const { status } = req.body; // Changed from response.status to just status
        const userId = req.user._id;

        // 1. Basic validation
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: "Invalid status provided" });
        }

        // 2. Find invitation
        const invitation = await Invitation.findOne({ token });
        if (!invitation) {
            return res.status(404).json({ success: false, error: "Invalid or expired invitation token" });
        }

        // 3. Handle Rejection
        if (status === "rejected") {
            invitation.status = "rejected";
            await invitation.save();
            return res.status(200).json({ success: true, message: "Invitation rejected" });
        }

        // 4. Handle Acceptance
        const project = await Project.findById(invitation.projectId);
        if (!project) {
            return res.status(404).json({ success: false, error: "Project not found" });
        }

        // Check if already a member using a safe comparison
        const isAlreadyMember = project.members.some(id => id.toString() === userId.toString());

        if (!isAlreadyMember) {
            project.members.push(userId);
            await project.save();
        }

        // 5. Update Invitation status
        invitation.status = "accepted";
        await invitation.save();

        return res.status(200).json({
            success: true,
            message: "Project joined successfully",
            projectId: project._id
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error while responding" });
    }
}


// ============== TASK CONTROLLERS =================


export const createTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, status, assignedTo } = req.body;
        const userId = req.user._id;

        // Check if Project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, error: "Project not found" });
        }

        // Check Existing Task with same title in the project
        const existingTask = await Task.findOne({ title, projectId });
        if (existingTask) {
            return res.status(400).json({ success: false, error: "A task with this title already exists in the project" });
        }


        // Check assignedTo user exist and is member of the project
        if (assignedTo) {
            const assignedUser = await User.findById(assignedTo);
            if (!assignedUser) {
                return res.status(404).json({ success: false, error: "Assigned user not found" });
            }
            if (!project.members.includes(assignedTo)) {
                return res.status(400).json({ success: false, error: "Assigned user is not a member of the project" });
            }
        }

        // Create Task
        const task = await Task.create({
            projectId,
            title,
            description,
            status,
            assignedTo
        });

        return res.status(201).json({ success: true, message: "Task created successfully", task });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while creating task" });
    }
}

export const getTasks = async (req, res) => {

    try {
        const userId = req.user._id;
        const { projectId } = req.params;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ success: false, error: "Project not found" });
        }

        // Check if user is member of the project
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());

        if (!isMember) {
            return res.status(403).json({
                success: false,
                error: "Access Denied: You are not a member of this project"
            });
        }
        const tasks = await Task.find({ projectId })
            .populate("assignedTo", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, tasks });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while fetching tasks" });
    }
}

export const updateTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updateData = req.body;
        const userId = req.user._id;

        // Check if task exists
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ success: false, error: "Task not found" });
        }

        // Check if user is member of the project
        const project = await Project.findById(task.projectId);
        const isMember = project.members.some(memberId => memberId.toString() === userId.toString());

        if (!isMember) {
            return res.status(403).json({
                success: false,
                error: "Access Denied: You are not a member of this project"
            });
        }


        // If assignedTo is being updated, validate the user
        if (updateData.assignedTo) {
            const assignedUser = await User.findById(updateData.assignedTo);
            if (!assignedUser) {
                return res.status(404).json({ success: false, error: "Assigned user not found" });
            }
            if (!project.members.includes(updateData.assignedTo)) {
                return res.status(400).json({ success: false, error: "Assigned user is not a member of the project" });
            }
        }

        // Check existing Task with same title in the project (if title is being updated)
        if (updateData.title) {
            const existiongTask = await Task.findOne({ title: updateData.title, projectId: task.projectId });
            if (existiongTask && existiongTask._id.toString() !== taskId) {
                return res.status(400).json({ success: false, error: "A task with this title already exists in the project" });
            }
        }

        // Update Task
        const updatedTask = await Task.findByIdAndUpdate(taskId, { $set: updateData }, { new: true });

        return res.status(200).json({ success: true, message: "Task updated successfully", updatedTask });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while updating task" });
    }
}

export const deleteTaskById = async (req, res) => {

    try {
        const { taskId } = req.params;
        const userId = req.user._id;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(400).json({ success: false, error: "Task not found" })
        }

        const project = await Project.findById(task.projectId)
        if (!project) {
            return res.status(404).json({ success: false, error: "Associated project not found" });
        }


        const isMember = project.members.some(memberId => memberId.toString() === userId.toString())

        if (!isMember) {
            return res.status(403).json({
                success: false,
                error: "Access Denied: You are not a member of this project"
            });
        }

        await Task.findByIdAndDelete(taskId)

        return res.status(200).json({ success: true, message: "Task Deleted Successfully" })

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server error while deleting task"
        });
    }

}


//  ===============================================