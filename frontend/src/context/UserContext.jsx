

import { createContext, useContext, useEffect, useState } from "react";
import { getUserAuth } from "../api/userApi.js";
import { showToast } from "../utils/toast.js";


export const UserContext = createContext()


export default function UserProvider({ children }) {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        setLoading(true);
        try {
            const response = await getUserAuth()
            if (response?.data?.success) {
                setUser(response?.data?.user);
                setLoading(false);
            }
            return response?.data;

        } catch (error) {
            console.error("Failed to fetch user:", error);
            showToast.error(error?.response?.data?.message || "Failed to fetch user data.");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return <UserContext.Provider value={{
        user,
        loading, setLoading
    }}>
        {children}
    </UserContext.Provider>
}


export const useUserContext = () => useContext(UserContext);