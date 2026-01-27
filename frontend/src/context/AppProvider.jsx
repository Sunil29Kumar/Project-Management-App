import AuthProvider from "./AuthContext";
import { LayoutProvider } from "./LayoutContext";
import ProjectProvider from "./ProjectContext";
import { ThemeContext, ThemeProvider } from "./ThemeContext";


export function AppProvider({ children }) {
    return (
        <AuthProvider>
            <ThemeProvider>
                <LayoutProvider>
                    <ProjectProvider>
                        {children}
                    </ProjectProvider>
                </LayoutProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}