const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    // 1. Basic Info (Galti kya hai?)
    title: {
        type: String,
        required: [true, "Issue title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Issue description is required"]
    },

    // 2. Ticket Type (Bug hai ya sirf sudhaar?)
    type: {
        type: String,
        enum: ['Bug', 'Issue', 'Improvement'],
        default: 'Bug'
    },

    // 3. Severity & Status (Kitna bada khatra hai?)
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
    },
    status: {
        type: String,
        enum: ['Open', 'In-Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },

    // 4. Relationships (Ye kahan se juda hai?)
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true // Har issue kisi task ka part hoga
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true // Project context ke liye
    },

    // 5. Accountability (Kaun zimmedar hai?)
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Jisne bug pakda (Owner/QA)
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Jo isse theek karega (Usually Task Assignee)
    }

}, { timestamps: true }); 

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;