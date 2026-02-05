import { createContext, useContext, useEffect, useState } from "react";
import { getAllProjectTasksAuth, getCommentsForTaskAuth, getProjectTasksAuth } from "../api/taskApi.js";
import { showToast } from "../utils/toast.js";


export const TaskContext = createContext()


export default function TaskProvider({ children }) {

    const [allProjectTasks, setAllProjectTasks] = useState()
    const [projectTasks, setProjectTasks] = useState([]);

    const [commentsForTask, setCommentsForTask] = useState([]);

    const [isClickOnNewTask, setIsClickOnNewTask] = useState(false);
    const [isClickOnCreateTask, setIsClickOnCreateTask] = useState(false);
    const [isClickOnUpdateTask, setIsClickOnUpdateTask] = useState(false);


    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(false);


    const getAllTasks = async () => {
        try {
            const response = await getAllProjectTasksAuth();
            setAllProjectTasks(response?.data?.tasks);
        } catch (error) {
            showToast.error(error?.message || "Failed to fetch tasks.");
        }
    }

    useEffect(() => {
        getAllTasks();
    }, [])


    const getTasksByProjectId = async (projectId) => {
        try {
            const response = await getProjectTasksAuth(projectId);
            setProjectTasks(response?.data?.tasks);
            getAllTasks();
        } catch (error) {
            showToast.error(error?.message || "Failed to fetch tasks for the project.");
        }
    }


    const getCommentsForTask = async (taskId) => {
        setLoading(true);
        try {
            const response = await getCommentsForTaskAuth(taskId);
            setCommentsForTask(response?.data?.comments || []);
            return response?.data?.comments || [];
        } catch (error) {
            showToast.error(error?.message || "Failed to fetch comments for the task.");
            return [];
        }
        finally {
            setLoading(false);
        }
    }


    return <TaskContext.Provider value={{
        allProjectTasks, getAllTasks,
        projectTasks, getTasksByProjectId,
        isClickOnNewTask, setIsClickOnNewTask,
        isClickOnCreateTask, setIsClickOnCreateTask,
        isClickOnUpdateTask, setIsClickOnUpdateTask,
        selectedTask, setSelectedTask,
        loading, setLoading,
        commentsForTask, getCommentsForTask
    }}>
        {children}
    </TaskContext.Provider>
}


export const useTaskContext = () => useContext(TaskContext);