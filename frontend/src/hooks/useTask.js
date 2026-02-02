import { createTaskAuth, deleteTaskAuth, updateTaskAuth } from "../api/taskApi.js";
import { useTaskContext } from "../context/TaskContext";
import { showToast } from "../utils/toast.js";


export const useTask = () => {

    const { setSelectedTask, setLoading, setIsClickOnUpdateTask, setIsClickOnCreateTask, setIsClickOnNewTask, getAllTasks } = useTaskContext();

    const createTask = async (projectId, data) => {
        setLoading(true);
        try {
            const response = await createTaskAuth(projectId, data.title, data.description, data.status, data.assignedTo, data.priority, data.dueDate, data.assigneerRole);
            showToast.success(response.message || "Task created successfully.", "success");
            setIsClickOnNewTask(false);
            setIsClickOnCreateTask(false);
            await getAllTasks();

        } catch (error) {
            showToast.error(error.response?.data?.error || "Failed to create task.");
            return { success: false };
        }
        finally { setLoading(false); }
    }


    const handleTaskEditClick = (task) => {
        setSelectedTask(task);
        setIsClickOnUpdateTask(true);
    };


    const updateTask = async (taskId, data, silent = false) => {
        if (!silent) setLoading(true);
        try {
            const response = await updateTaskAuth(taskId, data?.title, data?.description, data?.status, data?.assignedTo, data?.priority, data?.dueDate, data?.assigneerRole);

            if (!silent) {
                await getAllTasks();
                showToast.success(response.message || "Task updated successfully.", "success");
                setIsClickOnUpdateTask(false);
            }
            return response?.data;
        } catch (error) {
            showToast.error(error.response?.data?.error || "Failed to update task.");
        }
        finally {
            if (!silent) setLoading(false);
        }
    }


    const deleteTask = async (taskId) => {
        setLoading(true);
        try {
            const response = await deleteTaskAuth(taskId);
            showToast.success(response.message || "Task deleted successfully.", "success");
            await getAllTasks();
        } catch (error) {
            showToast.error(error.response?.data?.error || "Failed to delete task.");
        } finally {
            setLoading(false);
        }
    }

    return { createTask, handleTaskEditClick, updateTask, deleteTask };
}