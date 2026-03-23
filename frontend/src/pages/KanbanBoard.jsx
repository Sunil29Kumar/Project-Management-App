import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useParams } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { useTaskContext } from '../context/TaskContext';
import { useTask } from '../hooks/useTask';
import { showToast } from '../utils/toast';
// Icons ke liye (npm install lucide-react)
import { Plus, MoreHorizontal, Calendar, Clock, Layout, AlignLeft, ShieldCheck, MessageSquareMore } from 'lucide-react';
import { useUserContext } from '../context/UserContext';
import BoardHeader from '../components/kanban board/BoardHeader';
import TaskComment from '../components/kanban board/TaskComment';
import DraggableTasks from '../components/dashboard/DraggableTasks';

const KanbanBoard = () => {
    const { projects } = useProjectContext();

    const { setIsClickOnNewTask, projectTasks, getTasksByProjectId, getAllTasks, commentsForTask, getCommentsForTask } = useTaskContext();
    const [activeTaskId, setActiveTaskId] = useState(null);
    const { updateTask, addCommentToTask } = useTask()
    const { user } = useUserContext()
    const { projectId } = useParams();

    const [assignedTasks, setAssignedTasks] = useState();
    const [commentText, setCommentText] = useState("");

    const [columns, setColumns] = useState({
        "todo": { name: 'To Do', items: [], color: 'bg-slate-400' },
        "in-progress": { name: 'In Progress', items: [], color: 'bg-amber-500' },
        "done": { name: 'Completed', items: [], color: 'bg-emerald-500' }
    });

    useEffect(() => {
        if (projectId) {
            getTasksByProjectId(projectId);
        }
    }, [projectId]);

    const selectedProject = projects?.find(proj => proj._id === projectId);

    // check project owner
    const isProjectOwner = selectedProject?.owner?._id === user?._id;

    const handleCommentChange = async (e) => {
        await addCommentToTask(activeTaskId, commentText);
        setCommentText("");
    }

    useEffect(() => {
        if (activeTaskId) {
            getCommentsForTask(activeTaskId);
        }
    }, [commentsForTask])


    // Populate columns when projectTasks change
    useEffect(() => {
        if (projectTasks && Array.isArray(projectTasks)) {
            const newCols = {
                "todo": { name: 'To Do', items: [], color: 'bg-slate-400' },
                "in-progress": { name: 'In Progress', items: [], color: 'bg-amber-500' },
                "done": { name: 'Completed', items: [], color: 'bg-emerald-500' }
            };

            projectTasks.forEach(task => {
                const assigneeId = task.assignedTo?._id || task.assignedTo
                if (isProjectOwner || assigneeId === user?._id) {
                    if (newCols[task.status]) newCols[task.status].items.push(task);
                }
            });
            setColumns(newCols);
        }
    }, [projectTasks, user, isProjectOwner]);


    const assignedTasksForUser = projectTasks.filter(task => {
        if (isProjectOwner) return task;
        const assigneeId = task.assignedTo?._id || task.assignedTo;
        return assigneeId === user?._id;
    });


    useEffect(() => {
        setAssignedTasks(assignedTasksForUser);
    }, [projectTasks, user]);



    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        if (source.droppableId !== destination.droppableId) {
            const sourceCol = columns[source.droppableId];
            const destCol = columns[destination.droppableId];
            const sourceItems = [...sourceCol.items];
            const destItems = [...destCol.items];

            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...sourceCol, items: sourceItems },
                [destination.droppableId]: { ...destCol, items: destItems }
            });

            const updateData = {
                ...removed,
                status: destination.droppableId,
                assignedTo: removed.assignedTo?._id || removed.assignedTo,
            };

            await updateTask(draggableId, updateData, true);
            showToast.success(`Task moved to ${destination.droppableId.replace('-', ' ')}`, "success");
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: { ...column, items: copiedItems }
            });
        }
    };

    return (
        <div
            className="flex flex-col  h-[85vh] bg-[#F8FAFC] dark:bg-[#0B0F1A] overflow-hidden">

            {/* --- Header Section --- */}
            <BoardHeader selectedProject={selectedProject} isProjectOwner={isProjectOwner} setIsClickOnNewTask={setIsClickOnNewTask} />

            {/* --- Board Content --- */}
            <main className="flex-1 overflow-x-auto p-8 scrollbar-hide">
                <DragDropContext onDragEnd={onDragEnd}>

                    <div className="flex justify-center gap-6 h-full min-w-max">

                        {Object.entries(columns).map(([columnId, column], index, array) => (

                            <div className={`flex flex-col  w-[350px] px-4 ${index !== array.length - 1 ? 'border-r border-slate-200 dark:border-slate-800/50' : ''
                                }`} key={columnId}>

                                {/* Column Header */}
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
                                        <h2 className="font-bold text-slate-700 dark:text-slate-300 text-sm tracking-wide">
                                            {column.name}
                                        </h2>
                                        <span className="ml-1 text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                                            {column.items.length}
                                        </span>
                                    </div>
                                    <Plus className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-500 transition-colors" />
                                </div>

                                {/* Droppable Area */}
                                <Droppable droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex-1 flex flex-col gap-3 p-2 rounded-xl transition-colors duration-200 ${snapshot.isDraggingOver
                                                ? 'bg-slate-200/40 dark:bg-slate-800/40'
                                                : 'bg-transparent'
                                                }`}
                                        >

                                            {/*  Draggable Tasks */}
                                            <DraggableTasks column={column} activeTaskId={activeTaskId} getCommentsForTask={getCommentsForTask} setActiveTaskId={setActiveTaskId} commentText={commentText} setCommentText={setCommentText} handleCommentChange={handleCommentChange} commentsForTask={commentsForTask} />

                                            {provided.placeholder}

                                            {/* Quick Add Button at bottom of column */}
                                            {isProjectOwner && (
                                                <button
                                                    onClick={() => setIsClickOnNewTask(true)}
                                                    className="w-full py-2 flex items-center justify-center gap-2 text-slate-400 hover:text-indigo-500 hover:bg-white dark:hover:bg-slate-900 rounded-lg text-xs font-medium transition-all border border-dashed border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                                                >
                                                    <Plus className="w-3 h-3" /> Add Task
                                                </button>
                                            )}

                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </DragDropContext>
            </main>
        </div>
    );
};

export default KanbanBoard;