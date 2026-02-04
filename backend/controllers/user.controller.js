import User from "../models/user.model.js";
export const user = async (req, res) => {
    const userId = req.user._id;

    try {
        const userDoc = await User.findById(userId);
        return res.status(200).json({ success: true, user: userDoc });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch user data" });
    }

}


export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true }
        );
        return res.status(200).json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to update profile" });
    }
}



export const changePassword = async (req, res) => {

    try {
        const userId = req.user._id;
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(userId);

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Old password is incorrect" });
        }

        user.password = newPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to change password" });
    }

}

export const updateAvatar = async (req, res) => {
    try {
        const { avatarUrl } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: avatarUrl },
            { new: true }
        );
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}