import axios from "./axios.js"


export const createProjectAuth = async (name, description, status, tags) => {
    try {
        const response = await axios.post('/projects/create', { name, description, status, tags })
        return response.data;
    }
    catch (error) {
        return error?.response.data
    }
}


export const getAllProjectsAuth = async () => {
    try {
        const response = await axios.get('/projects/')
        return response.data;
    }
    catch (error) {
        return error?.response.data
    }
}


export const updateProjectAuth = async (projectId, name, description, status, tags) => {
    try {
        const response = await axios.put(`/projects/${projectId}`, { name, description, status, tags })
        return response.data;
    }
    catch (error) {
        return error?.response.data
    }
}



export const deleteProjectAuth = async (projectId) => {
    try {
        const response = await axios.delete(`/projects/${projectId}`)
        return response.data;
    }
    catch (error) {
        return error?.response.data
    }
}