

import { createContext, useContext, useEffect, useState } from "react";
import { getUserAuth } from "../api/userApi.js";


export const UserContext = createContext()


export default function UserProvider({ children }) {


    const [user, setUser] = useState(null);

    const getUser = async () => {
        const data = await getUserAuth()
        if (data?.success) {
            setUser(data?.user);
        }
        return data;
    }

    useEffect(() => {
        getUser();
    }, []);

    return <UserContext.Provider value={{
        user
    }}>
        {children}
    </UserContext.Provider>
}


export const useUser = () => useContext(UserContext);