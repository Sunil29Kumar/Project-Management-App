import { createContext, useContext, useEffect, useState } from "react";
import { createProjectAuth, deleteProjectAuth, getAllProjectsAuth, updateProjectAuth } from "../api/projectApi.js"
import { showToast } from "../utils/toast.js";

export const ProjectContext = createContext();

export default function ProjectProvider({ children }) {

    const [projects, setProjects] = useState();
    const [selectedProject, setSelectedProject] = useState(null);

    const [isClickOnNewProject, setIsClickOnNewProject] = useState(false);
    const [isClickOnCreateProject, setIsClickOnCreateProject] = useState(false);
    const [isClickOnUpdateProject, setIsClickOnUpdateProject] = useState(false);



    const getAllProjects = async () => {
        try {
            const response = await getAllProjectsAuth();
            setProjects(response?.data?.projects);
        } catch (error) {
            showToast.error(error?.message || "Failed to fetch projects.");
        }
    }
    useEffect(() => {
        getAllProjects()
    }, [])


    return <ProjectContext.Provider value={{
        projects, setProjects,
        isClickOnNewProject, setIsClickOnNewProject,
        isClickOnCreateProject, setIsClickOnCreateProject,
        isClickOnUpdateProject, setIsClickOnUpdateProject,
        selectedProject, getAllProjects, setSelectedProject
    }}>
        {children}
    </ProjectContext.Provider>
}

export const useProjectContext = () => useContext(ProjectContext);