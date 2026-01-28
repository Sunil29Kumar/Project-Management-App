import { mongoose, Schema } from "mongoose";


const taskSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });


const Task = await mongoose.model("Task", taskSchema);

export default Task;