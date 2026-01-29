import { mongoose, Schema } from "mongoose";


const invitationSchema = new Schema({
    invitedEmail: { type: String, required: true },
    token: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    expiresAt: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 } // 24 hours expiry
}, { timestamps: true });

const Invitation = mongoose.model("Invitation", invitationSchema);

export default Invitation;