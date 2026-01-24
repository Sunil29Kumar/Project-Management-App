import { createContext } from "react";

export const ProjectContext = createContext();

export default function ProjectProvider({ children }) {

    const [projects, setProjects] = [];
    


    return <ProjectContext.Provider value={{}}>
        {children}
    </ProjectContext.Provider>
}