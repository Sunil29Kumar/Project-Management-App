import axios from "./axios.js"


export const createProjectAuth = async (name, description, status, tags) =>
    await axios.post('/projects/create', { name, description, status, tags })


export const getAllProjectsAuth = async () => await axios.get('/projects')


export const updateProjectAuth = async (projectId, name, description, status, tags) =>
    await axios.put(`/projects/${projectId}`, { name, description, status, tags })


export const deleteProjectAuth = async (projectId) =>
    await axios.delete(`/projects/${projectId}`)


export const inviteMemberToProjectAuth = async (projectId, email) =>
    await axios.post(`/projects/${projectId}/invite`, { email })


export const respondToInvitationAuth = async (token, status) =>
    await axios.post(`/projects/invitations/${token}/respond`, { status })

export const inviteMultipleMembersToProjectAuth = async (projectId, email) =>
    await axios.post(`/projects/${projectId}/invite`, { email })
