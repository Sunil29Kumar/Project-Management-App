import { createContext, useContext, useEffect, useState } from "react";
import { createTaskAuth, deleteTaskAuth, getAllProjectTasksAuth, updateTaskAuth } from "../api/taskApi.js";
import { useProject } from "./ProjectContext.jsx";


export const TaskContext = createContext()


export default function TaskProvider({ children }) {

    const [allProjectTasks, setAllProjectTasks] = useState()

    const [isClickOnNewTask, setIsClickOnNewTask] = useState(false);
    const [isClickOnCreateTask, setIsClickOnCreateTask] = useState(false);
    const [isClickOnUpdateTask, setIsClickOnUpdateTask] = useState(false);
    
    const [selectedTask, setSelectedTask] = useState(null);


    const getAllTasks = async () => {
        const data = await getAllProjectTasksAuth();
        console.log("tasks = ", data);

        if (data?.success) {
            setAllProjectTasks(data?.tasks);
        }
        return data;
    }

    useEffect(() => {
        getAllTasks();
    }, [])


    const handleTaskEditClick = (task) => {
        setSelectedTask(task);
        setIsClickOnUpdateTask(true);
    };

    const updateTask = async (taskId, title, description, status, assignedTo, priority, dueDate, assigneerRole) => {
        const data = await updateTaskAuth(taskId, title, description, status, assignedTo, priority, dueDate, assigneerRole);
        return data;
    }



    const createTask = async (projectId, title, description, status, assignedTo, priority, dueDate, assigneerRole) => {
        console.log("Context Data:", { projectId, title, dueDate });
        const data = await createTaskAuth(projectId, title, description, status, assignedTo, priority, dueDate, assigneerRole);
        return data;
    }


    const deleteTask = async (taskId) => {
        const data = await deleteTaskAuth(taskId);
        return data; 
    }




    return <TaskContext.Provider value={{
        allProjectTasks, getAllTasks
        , isClickOnNewTask, setIsClickOnNewTask,
        isClickOnCreateTask, setIsClickOnCreateTask,
        isClickOnUpdateTask, setIsClickOnUpdateTask,
        createTask,
        selectedTask, setSelectedTask
        , handleTaskEditClick , updateTask , deleteTask
    }}>
        {children}
    </TaskContext.Provider>
}


export const useTask = () => useContext(TaskContext);