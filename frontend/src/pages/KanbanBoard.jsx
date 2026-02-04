import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useParams } from 'react-router-dom';
import { useProjectContext } from '../context/ProjectContext';
import { useTaskContext } from '../context/TaskContext';
import { useTask } from '../hooks/useTask';
import { showToast } from '../utils/toast';
// Icons ke liye (npm install lucide-react)
import { Plus, MoreHorizontal, Calendar, Clock, Layout, AlignLeft, ShieldCheck } from 'lucide-react';
import {  useUserContext } from '../context/UserContext';

const KanbanBoard = () => {
    const { projects } = useProjectContext();
    const { setIsClickOnNewTask, projectTasks, getTasksByProjectId, getAllTasks } = useTaskContext();
    const { updateTask } = useTask()
    const { user } = useUserContext()
    const { projectId } = useParams();

    const [assignedTasks, setAssignedTasks] = useState();

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
        <div className="flex flex-col  h-[85vh] bg-[#F8FAFC] dark:bg-[#0B0F1A] overflow-hidden">
            {/* --- Header Section --- */}
            <header className="w-full flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm z-20 gap-6">
                {/* Left Side: Brand & Project Info */}
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                        <Layout className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                {selectedProject?.name || "Project Board"}
                            </h1>
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${selectedProject?.status === 'active'
                                ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                                : 'bg-amber-50 text-amber-600 border-amber-200'
                                }`}>
                                {selectedProject?.status || 'Planning'}
                            </span>
                        </div>

                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-md line-clamp-1">
                            {selectedProject?.description || "Manage your team tasks and deadlines effectively."}
                        </p>

                        {/* Sub-header Metadata */}
                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold uppercase tracking-tighter">
                                    Created {selectedProject?.createdAt ? new Date(selectedProject.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : 'N/A'}
                                </span>
                            </div>
                            <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                                    {isProjectOwner ? "Owner" : "Member"}
                                </span>
                            </div>
                            {/* Dynamic Tags */}
                            {selectedProject?.tags?.map((tag, i) => (
                                <span key={i} className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800/50 px-2 py-0.5 rounded">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Team & Actions */}
                <div className="flex items-center gap-6 self-end md:self-center">
                    {/* Team Section */}
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Team Members ({selectedProject?.members?.length})</span>
                        <div className="flex -space-x-3 hover:space-x-1 transition-all duration-300">
                            {selectedProject?.members?.slice(0, 4).map((m, i) => (
                                <img
                                    key={m}
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m + selectedProject.name}`}
                                    className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 shadow-sm object-cover"
                                    alt="member"
                                />
                            ))}
                            {selectedProject?.members?.length > 4 && (
                                <div className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                    +{selectedProject.members.length - 4}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
                        <div className="text-right mr-2">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Total Issues</p>
                            <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-none">{selectedProject?.totalTasks || 0}</p>
                        </div>
                        {isProjectOwner && (
                            <>
                                <button
                                    onClick={() => setIsClickOnNewTask(true)}
                                    className="flex items-center cursor-pointer gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-indigo-200 dark:shadow-none active:scale-95"
                                >
                                    <Plus className="w-4 h-4" /> New Ticket
                                </button>
                                <button className="p-2.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </>

                        )}
                    </div>
                </div>
            </header>

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
                                            {column.items.map((item, index) => (
                                                <Draggable key={item._id} draggableId={item._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`bg-white dark:bg-[#161B26] p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm transition-all hover:border-indigo-500/50 hover:shadow-md ${snapshot.isDragging ? 'rotate-[2deg] shadow-2xl ring-2 ring-indigo-500/50 z-50' : ''
                                                                }`}
                                                        >
                                                            {/* Priority Badge */}
                                                            <div className="flex justify-between items-start mb-3">
                                                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${item.priority === 'critical' || item.priority === 'high'
                                                                    ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                                                                    : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                                                    }`}>
                                                                    {item.priority}
                                                                </span>
                                                                <button className="text-slate-300 hover:text-slate-500 transition-colors">
                                                                    <MoreHorizontal className="w-4 h-4" />
                                                                </button>
                                                            </div>

                                                            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
                                                                {item.title}
                                                            </h4>

                                                            {item.description && (
                                                                <div className="flex items-center gap-1 text-slate-400 mb-4">
                                                                    <AlignLeft className="w-3 h-3" />
                                                                    <p className="text-[11px] truncate">{item.description}</p>
                                                                </div>
                                                            )}

                                                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50 dark:border-slate-800">
                                                                <div className="flex items-center gap-3 text-slate-400">
                                                                    <div className="flex items-center gap-1">
                                                                        <Calendar className="w-3 h-3" />
                                                                        <span className="text-[10px] font-medium">
                                                                            {item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No date'}
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                {/* Assignee Avatar */}
                                                                <div
                                                                    title={item.assignedTo?.name}
                                                                    className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white dark:border-slate-800 shadow-sm"
                                                                >
                                                                    {item.assignedTo?.name?.charAt(0).toUpperCase() || 'U'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
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