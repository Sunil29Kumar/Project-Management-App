import {createContext, type ReactNode} from "react";

interface AuthContextType {
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export default function AuthProvider({children}: {children: ReactNode}) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
