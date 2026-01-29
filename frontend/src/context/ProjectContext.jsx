import { createContext, useContext, useEffect, useState } from "react";
import { createProjectAuth, deleteProjectAuth, getAllProjectsAuth, updateProjectAuth } from "../api/projectApi.js"
import { showToast } from "../utils/toast.js";

export const ProjectContext = createContext();

export default function ProjectProvider({ children }) {

    const [projects, setProjects] = useState();
    const [isClickOnNewProject, setIsClickOnNewProject] = useState(false);
    const [isClickOnCreateProject, setIsClickOnCreateProject] = useState(false);
    const [isClickOnUpdateProject, setIsClickOnUpdateProject] = useState(false);

    const [selectedProject, setSelectedProject] = useState(null);

    const createProject = async (name, description, status, tags) => {
        const data = await createProjectAuth(name, description, status, tags)
        return data;
    }

    const getAllProjects = async () => {
        const data = await getAllProjectsAuth();
        if (data?.success) {
            setProjects(data?.projects);
        }
        return data;
    }

    useEffect(() => {
        getAllProjects();
    }, [])


    const handleEditClick = (project) => {
        setSelectedProject(project);
        setIsClickOnUpdateProject(true);
    };

    const updateProject = async (projectId, name, description, status, tags) => {
        const data = await updateProjectAuth(projectId, name, description, status, tags);
        return data;
    }


    const deleteProject = async (projectId) => {
        const data = await deleteProjectAuth(projectId);
        if (data.success) {
            showToast.success(data.message || "Project deleted successfully.", "success");
            getAllProjects();
        }
        else {
            showToast.error(data.error || "Failed to delete project.", "error");
        }
        return data;
    }


    return <ProjectContext.Provider value={{
        projects, setProjects, createProject,
        isClickOnNewProject, setIsClickOnNewProject,
        isClickOnCreateProject, setIsClickOnCreateProject,
        isClickOnUpdateProject, setIsClickOnUpdateProject,
        getAllProjects,
        selectedProject,
        handleEditClick,
        updateProject,
        deleteProject
    }}>
        {children}
    </ProjectContext.Provider>
}


export const useProject = () => useContext(ProjectContext);