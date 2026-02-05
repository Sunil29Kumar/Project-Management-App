// models/log.model.js
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, 
    performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    action: {
        type: String,
        required: true,
        enum: ['STATUS_CHANGE', 'TASK_CREATED', 'TASK_ASSIGNED', 'COMMENT_ADDED']
    },
    details: {
        from: String, // Purana status (e.g., "To Do")
        to: String,   // Naya status (e.g., "In Progress")
        message: String // "Rahul updated the status to In Progress"
    }
}, { timestamps: true });

const Log = mongoose.model("Log", logSchema);
export default Log;