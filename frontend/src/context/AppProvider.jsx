import AuthProvider from "./AuthContext";
import ProjectProvider from "./ProjectContext";
import ThemeContext from "./ThemeContext";


export function AppProvider({ children }) {
    return (
        <AuthProvider>
            <ThemeContext>
                <ProjectProvider>
                    {children}
                </ProjectProvider>
            </ThemeContext>
        </AuthProvider>
    )
}