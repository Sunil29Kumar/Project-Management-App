import AuthProvider from "./AuthContext";
import { LayoutProvider } from "./LayoutContext";
import ProjectProvider from "./ProjectContext";
import TaskProvider from "./TaskContext";
import { ThemeContext, ThemeProvider } from "./ThemeContext";
import UserProvider from "./UserContext";


export function AppProvider({ children }) {
    return (
        <AuthProvider>
            <UserProvider>
                <ThemeProvider>
                    <LayoutProvider>
                        <ProjectProvider>
                            <TaskProvider>
                                {children}
                            </TaskProvider>
                        </ProjectProvider>
                    </LayoutProvider>
                </ThemeProvider>
            </UserProvider>
        </AuthProvider>
    )
}