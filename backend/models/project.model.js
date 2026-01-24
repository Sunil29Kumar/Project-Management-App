import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: [true, "Project name is required"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Jisne project banaya
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Team members jo is project par kaam karenge
        }
    ],
    status: {
        type: String,
        enum: ["active", "completed", "archived"],
        default: "active",
    },
    tags: [{ type: String }], // e.g. ["Frontend", "Urgent"]
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
export default Project;