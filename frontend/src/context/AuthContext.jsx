import { createContext, useState } from "react";
import { isAuthinicated, loginAuth, logoutAuth, registerAuth } from "../api/authApi.js";


export const AuthContext = createContext()



export default function AuthProvider({ children }) {

  const [isAuth, setIsAuth] = useState();
  const [user, setUser] = useState({});

  const checkAuthentication = async () => {
    try {
      const data = await isAuthinicated();
      if (data?.success) {
        setIsAuth(true);
        setUser(data.user);
      } else {
        setIsAuth(false);
      }
    } catch (error) {
      console.log("Error while checking Authentication: ", error);
      setIsAuth(false);
    }
  }


  const register = async (name, email, password) => {
    const data = await registerAuth(name, email, password)
    return data
  }

  const login = async (email, password) => {
    const data = await loginAuth(email, password)
    setIsAuth(true);
    return data
  }

  const logout = async () => {
    const data = await logoutAuth()
    setIsAuth(false);
    return data
  }


  return <AuthContext.Provider
    value={{
      register, login, logout, isAuth,setIsAuth, user, checkAuthentication
    }}>
    {children}
  </AuthContext.Provider>;
}
