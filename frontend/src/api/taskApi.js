
import axios from "./axios.js"


export const getAllProjectTasksAuth = async () => {
    try {
        const response = await axios.get(`/projects/tasks`)
        return response.data;
    }
    catch (error) {
        return error?.response.data
    }
}




export const createTaskAuth = async (projectId, title, description, status, assignedTo, priority, dueDate, assigneerRole) => {
    try {
        const response = await axios.post(`/projects/${projectId}/tasks`, { title, description, status, assignedTo, priority, dueDate, assigneerRole })
        return response.data;
    }
    catch (error) {
        return error?.response.data
    }
}


export const updateTaskAuth = async (taskId, title, description, status, assignedTo, priority, dueDate, assigneerRole) => {
    try {
        const response = await axios.put(`/projects/tasks/${taskId}`, { title, description, status, assignedTo, priority, dueDate, assigneerRole })
        return response.data;
    }
    catch (error) {
        return error?.response.data

    }
}



export const deleteTaskAuth = async (taskId) => {
    try {
        const response = await axios.delete(`/projects/tasks/${taskId}`)
        return response.data;
    }
    catch (error) {
        return error?.response.data
    }
}