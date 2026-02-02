
import axios from "./axios.js"


export const getAllProjectTasksAuth = async () => await axios.get(`/projects/tasks`)

export const getProjectTasksAuth = async (projectId) => await axios.get(`/projects/${projectId}/tasks`)


export const createTaskAuth = async (projectId, title, description, status, assignedTo, priority, dueDate, assigneerRole) =>
    await axios.post(`/projects/${projectId}/tasks`, { title, description, status, assignedTo, priority, dueDate, assigneerRole })


export const updateTaskAuth = async (taskId, title, description, status, assignedTo, priority, dueDate, assigneerRole) =>
    await axios.put(`/projects/tasks/${taskId}`, { title, description, status, assignedTo, priority, dueDate, assigneerRole })


export const deleteTaskAuth = async (taskId) =>
    await axios.delete(`/projects/tasks/${taskId}`)
