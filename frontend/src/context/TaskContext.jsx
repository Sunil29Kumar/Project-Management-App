import { createContext, useContext, useEffect, useState } from "react";
import {  getAllProjectTasksAuth } from "../api/taskApi.js";
import { showToast } from "../utils/toast.js";



export const TaskContext = createContext()


export default function TaskProvider({ children }) {

    const [allProjectTasks, setAllProjectTasks] = useState()

    const [isClickOnNewTask, setIsClickOnNewTask] = useState(false);
    const [isClickOnCreateTask, setIsClickOnCreateTask] = useState(false);
    const [isClickOnUpdateTask, setIsClickOnUpdateTask] = useState(false);

    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(false);


    const getAllTasks = async () => {
        try {
            const response = await getAllProjectTasksAuth();
            console.log("tasks = ", response);
            setAllProjectTasks(response?.data?.tasks);
        } catch (error) {
            showToast.error(error?.message || "Failed to fetch tasks.");
        }
    }

    useEffect(() => {
        getAllTasks();
    }, [])



    return <TaskContext.Provider value={{
        allProjectTasks, getAllTasks
        , isClickOnNewTask, setIsClickOnNewTask,
        isClickOnCreateTask, setIsClickOnCreateTask,
        isClickOnUpdateTask, setIsClickOnUpdateTask,
        selectedTask, setSelectedTask,
        loading, setLoading
    }}>
        {children}
    </TaskContext.Provider>
}


export const useTaskContext = () => useContext(TaskContext);