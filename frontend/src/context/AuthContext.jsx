import { createContext } from "react";
import { loginAuth, logoutAuth, registerAuth } from "../api/authApi.js";


export const AuthContext = createContext(null)

const register = async (name, email, password) => {
  const data = await registerAuth(name, email, password)
  return data
}

const login = async (email, password) => {
  const data = await loginAuth(email, password)
  return data
}

const logout = async () => {
  const data = await logoutAuth()
  return data
}

export default function AuthProvider({ children }) {
  return <AuthContext.Provider
    value={{
      register,login, logout
    }}>
    {children}
  </AuthContext.Provider>;
}
