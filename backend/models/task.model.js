import { Schema } from "mongoose";


const taskSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, ref: "Project"},
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });


const Task = mongoose.model("Task", taskSchema);

export default Task;