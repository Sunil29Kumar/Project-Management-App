import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "Task must belong to a project"]
    },
    title: {
        type: String,
        required: [true, "Task title is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"], 
        default: "todo"
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Task must be assigned to a user"]
    },
    assigneerRole: {
        type: String,
        enum: [
            "developer", 
            "qa/tester", 
            "designer", 
            "devops", 
            "manager", 
            "lead"
        ],
        default: "developer"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "critical"],
        default: "medium"
    },
    dueDate: {
        type: Date,
        default: null
    },
    commentsCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;