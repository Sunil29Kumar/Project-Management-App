
import { changePasswordAuth, updateUserAvatarAuth, updateUserNameEmailAuth } from "../api/userApi"
import { useUserContext } from "../context/UserContext"
import { showToast } from "../utils/toast.js"


export const useUser = () => {

    const { user, setLoading } = useUserContext()


    const updateUserNameEmail = async (name, email) => {
        setLoading(true);
        try {
            const response = await updateUserNameEmailAuth(name, email)
            if (response?.data?.success) {
                showToast.success(response?.data?.message);
                setLoading(false);
            }
            return response?.data;
        } catch (error) {
            console.error("Failed to update profile:", error);
            showToast.error(error?.response?.data?.message || "Failed to update profile.");
            setLoading(false);
            return error?.response?.data
        }
        finally {
            setLoading(false);
        }

    }


    const changePassword = async (oldPassword, newPassword) => {
        setLoading(true);
        try {
            const response = await changePasswordAuth(oldPassword, newPassword)
            console.log(response);

            if (response?.data?.success) {
                showToast.success(response?.data?.message);
                setLoading(false);
            }
            return response?.data;
        } catch (error) {
            console.error("Failed to change password:", error);
            showToast.error(error?.response?.data?.message || "Failed to change password.");
            setLoading(false);
            return error?.response?.data;
        }
        finally {
            setLoading(false);
        }
    }

    const updateUserAvatar = async (avatarUrl) => {
        setLoading(true);
        try {
            const response = await updateUserAvatarAuth(avatarUrl)
            console.log(response);
            if (response?.data?.success) {
                showToast.success("Avatar updated successfully");
                setLoading(false);
            }
            return response?.data;
        } catch (error) {
            console.error("Failed to update avatar:", error);
            showToast.error(error?.response?.data?.message || "Failed to update avatar.");
            setLoading(false);
            return error?.response?.data;
        }
        finally {
            setLoading(false);
        }
    }

    return { updateUserNameEmail, changePassword , updateUserAvatar}


}