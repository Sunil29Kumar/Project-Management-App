import { useContext } from "react";
import { ProjectContext, useProjectContext } from "../context/ProjectContext";
import { createProjectAuth, deleteProjectAuth, inviteMemberToProjectAuth, inviteMultipleMembersToProjectAuth, respondToInvitationAuth, updateProjectAuth } from "../api/projectApi.js";
import { showToast } from "../utils/toast.js";
import { useState } from "react";


export const useProject = () => {
    const { getAllProjects, setSelectedProject, setIsClickOnNewProject, setIsClickOnCreateProject, setIsClickOnUpdateProject,setInviteMembers } = useProjectContext(ProjectContext);

    const [loading, setLoading] = useState(false);


    const createProject = async (formData) => {
        setLoading(true);
        try {
            const response = await createProjectAuth(formData.name, formData.description, formData.status, formData.tags);
            showToast.success(response.data.message || "Project created successfully.", "success");
            setIsClickOnNewProject(false);
            setIsClickOnCreateProject(false);
            await getAllProjects();
            console.log("res = ", response);

            return response?.data
        } catch (err) {
            showToast.error(err.response?.data?.error || "Failed to create");
            return { success: false };
        }
        finally { setLoading(false); }
    }


    const handleEditClick = (project) => {
        setSelectedProject(project);
        setIsClickOnUpdateProject(true);
    };

    const updateProject = async (id, data) => {
        setLoading(true);
        try {
            const response = await updateProjectAuth(id, data.name, data.description, data.status, data.tags);
            showToast.success(response.data.message || "Project updated successfully.", "success");
            setIsClickOnUpdateProject(false);
            await getAllProjects();
        } catch (err) {
            showToast.error(err.response?.data?.error || "Failed to update project.");
        }
        finally { setLoading(false); }
    }


    const deleteProject = async (projectId) => {
        setLoading(true);
        try {
            const response = await deleteProjectAuth(projectId);
            showToast.success(response.data.message || "Project deleted successfully.", "success");
            await getAllProjects();
        } catch (error) {
            showToast.error(error.response?.data?.error || "Failed to delete project.");
        } finally { setLoading(false); }
    }


    const inviteMemberToProject = async (projectId, email) => {
        setLoading(true);
        try {
            const response = await inviteMemberToProjectAuth(projectId, email);
            showToast.success(response.data.message || "Invitation sent successfully.", "success");

        } catch (err) {
            showToast.error(err.response?.data?.error || "Failed to send invitation.");
        }
        finally { setLoading(false); }
    }


    const respondToInvitation = async (token, status) => {
        setLoading(true);
        try {
            const response = await respondToInvitationAuth(token, status);
            showToast.success(response.data.message || "Response recorded successfully.", "success");
            return response?.data;
        }
        catch (err) {
            showToast.error(err.response?.data?.error || "Failed to respond to invitation.");
            return { success: false };
        }
        finally { setLoading(false); }
    }


    const inviteMultipleMembersToProject = async (projectId, email) => {
        setLoading(true);
        try {
            const response = await inviteMultipleMembersToProjectAuth(projectId, email);
            showToast.success(response.data.message || "Invitations sent successfully.", "success");
            setInviteMembers({ isClickOnInviteMembers: false, projectId: null });
            console.log(response);
            
            return response?.data;
        } catch (err) {
            showToast.error(err.response?.data?.error || "Failed to send invitations.");
        }
        finally { setLoading(false); }
    }



    return { createProject, handleEditClick, updateProject, deleteProject, inviteMemberToProject, inviteMultipleMembersToProject, respondToInvitation, loading };
}