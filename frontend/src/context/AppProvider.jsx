import AuthProvider from "./AuthContext";
import ThemeContext from "./ThemeContext";


export function AppProvider({ children }) {
    return (
        <AuthProvider>
            <ThemeContext>
                {children}
            </ThemeContext>
        </AuthProvider>
    )
}