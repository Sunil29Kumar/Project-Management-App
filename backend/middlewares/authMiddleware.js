import User from "../models/auth.model.js";
import Session from "../models/session.model.js";


export default async function checkAuth(req, res, next) {

    const { sid } = req.signedCookies;
    if (!sid) {
        return res.status(401).json({ error: "User not Logged In" });
    }

    try {
        const session = await Session.findOne({ sessionId: sid });
        if (!session) {
            return res.status(401).json({ error: "Invalid Session. Please log in again." });
        }

        const user = await User.findOne({ _id: session.userId }).lean();
        if (!user) {
            return res.status(401).json({ error: "User not found. Please log in again." });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ error: "Invalid user ID" });
    }

}