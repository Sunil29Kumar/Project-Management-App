import type { ReactNode } from "react";
import AuthProvider from "./AuthContext";
import GlobalProvider from "./GlobalContext";


export function AppProvider({children}:{children: ReactNode}) {
    return (
        <GlobalProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </GlobalProvider>
    )
}