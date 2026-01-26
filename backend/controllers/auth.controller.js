import User from "../models/user.model.js";
import Session from "../models/session.model.js";


export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {

        console.error("Error during registration:", error);
        return res.status(500).json({ success: false, error: "Server error during registration" });
    }

}

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, error: "User does not exist" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, error: "Invalid password" });
        }


        // set session 
        const sessionId = crypto.randomUUID()
        const sessionExpiry = Date.now() + 1000 * 60 * 60 * 24 * 7;

        res.cookie("sid", sessionId, {
            httpOnly: true,
            signed: true,
            maxAge: sessionExpiry,
            sameSite: "none",
            secure: true
        })

        //set session in db
        const newSession = new Session({
            userId: user._id,
            sessionId: sessionId,
            expiresAt: new Date(sessionExpiry)
        });
        await newSession.save();

        // update user timestamp
        await User.updateOne(
            { email },
            { loginWith: "email", $push: { lastLoginAt: new Date() } }
        );

        return res.status(200).json({ success: true, message: "Login successful" });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error during login" });
    }
}


export const logout = async (req, res) => {
    try {
        const userId = req.user?._id;
        const sessionId = req.signedCookies.sid;

        if (!userId || !sessionId) {
            return res.status(400).json({ success: false, error: "No active session found" });
        }

        // 1. Delete session from DB first
        await Session.deleteOne({ userId, sessionId });

        // 2. Clear the cookie
        res.clearCookie("sid", {
            httpOnly: true,
            signed: true,
            sameSite: "none",
            secure: true
        });


        await User.findByIdAndUpdate(userId, {
            $push: { lastLogoutAt: new Date() }
        });

        return res.status(200).json({ success: true, message: "Logout successful" });

    } catch (error) {
        console.error("Logout Error:", error); // Terminal mein error check karne ke liye
        return res.status(500).json({ success: false, error: "Server error during logout" });
    }
}