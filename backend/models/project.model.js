

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            role: {
                type: String,
                enum: ['admin', 'developer', 'qa'],
                default: 'admin',
            }

        }
    ],

}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export default Project;