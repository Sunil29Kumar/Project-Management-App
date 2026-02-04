import { useState } from 'react';
import { MoreVertical, Calendar as CalendarIcon, CheckCircle2, Circle, Clock, Edit3, Trash2, Shield, ClipboardList, Plus } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import {  useUserContext } from '../../context/UserContext';
import { showToast } from '../../utils/toast.js';
import { useTask } from '../../hooks/useTask.js';
import { useNavigate } from 'react-router-dom';

const TaskList = ({ filteredTasks }) => {
    const [openMenuId, setOpenMenuId] = useState(null);
    const { handleTaskEditClick, deleteTask } = useTask();
    const { setIsClickOnUpdateTask, setIsClickOnNewTask, getAllTasks } = useTaskContext();
    const { user } = useUserContext()

    const navigate = useNavigate()


    const getPriorityStyles = (p) => {
        const styles = {
            Critical: 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
            High: 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20',
            Medium: 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20',
            Low: 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-500/10 dark:text-slate-400 dark:border-slate-500/20'
        };
        return styles[p] || styles.Low;
    };

    const getStatusUI = (status) => {
        switch (status?.toLowerCase()) {
            case 'done':
                return { icon: <CheckCircle2 size={14} />, classes: 'text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' };
            case 'in progress':
                return { icon: <Clock size={14} />, classes: 'text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' };
            default:
                return { icon: <Circle size={14} />, classes: 'text-slate-500 bg-slate-50 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700' };
        }
    };

    const handleDelete = async (taskId) => {
        const result = await deleteTask(taskId);
        if (result?.success) {
            showToast.success(result?.message || "Task deleted successfully.", "success");
            await getAllTasks();
        }
    }

    return (
        <>
            {filteredTasks?.length > 0 ?
                <div className=" h-full bg-white z-10 dark:bg-slate-900 rounded-3xl min-h-[20vh] border border-slate-100 dark:border-slate-800  shadow-sm ">

                    <table className="w-full text-left border-separate border-spacing-0">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 backdrop-blur-md">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Task Details</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Project</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Assignee</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Priority</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-200 dark:border-slate-800 text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody className=" divide-slate-100 dark:divide-slate-800/50">
                            {filteredTasks?.map((task) => {
                                const statusUI = getStatusUI(task.status);
                                const isOwner = task.projectId?.owner?.toString() === user?._id?.toString();
                                const showActionButtons = isOwner;

                                return (
                                    <tr key={task._id}
                                        onClick={() => navigate(`/projects/${task.projectId?._id}/board`)}
                                        className="group cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all">
                                        {/* Task Title & Date */}
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1.5">
                                                <span className="font-semibold text-[14px] text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                    {task.title}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                                                    <CalendarIcon size={12} className="text-slate-400" />
                                                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'No due date'}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Project Name */}
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[13px] font-bold text-slate-700 dark:text-slate-200">
                                                    {task.projectId?.name || 'Unassigned'}
                                                </span>
                                                <span className="text-[10px] w-fit px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 font-black uppercase tracking-tighter">
                                                    {task.projectId?.status || 'Active'}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Assignee with Role Badge */}
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${task.assignedTo?.name || 'User'}`}
                                                    className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-700 shadow-sm"
                                                    alt="avatar"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-200 leading-none">
                                                        {task.assignedTo?.name || 'Unassigned'}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1">
                                                        <Shield size={10} className="text-indigo-400" />
                                                        {task.assigneerRole || 'Member'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Priority Badge */}
                                        <td className="px-6 py-5">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg border ${getPriorityStyles(task.priority)}`}>
                                                {task.priority}
                                            </span>
                                        </td>

                                        {/* Status Badge */}
                                        <td className="px-6 py-5">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border border-transparent shadow-sm ${statusUI.classes}`}>
                                                {statusUI.icon} <span className="capitalize">{task.status}</span>
                                            </div>
                                        </td>

                                        {/* Action Button */}
                                        <td
                                            onClick={(e)=> e.stopPropagation() }
                                            className="px-6 py-5 z-10 text-right relative">

                                            {showActionButtons && (
                                                <button
                                                    onClick={() => setOpenMenuId(openMenuId === task._id ? null : task._id)}
                                                    className="text-slate-400 cursor-pointer hover:text-indigo-600 p-2 rounded-xl hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all "
                                                >
                                                    <MoreVertical size={18} />
                                                </button>
                                            )}


                                            {openMenuId === task._id && (
                                                <>
                                                    <div className="fixed inset-0 " onClick={() => setOpenMenuId(null)}></div>
                                                    <div className="absolute right-15 bottom-15 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-30 py-2 animate-in fade-in zoom-in-95 duration-150">
                                                        <button
                                                            onClick={() => { setIsClickOnUpdateTask(true); setOpenMenuId(null); handleTaskEditClick(task); }}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                                        >
                                                            <Edit3 size={16} className="text-indigo-500" /> Update Task
                                                        </button>
                                                        <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2"></div>
                                                        <button
                                                            onClick={() => { handleDelete(task._id); setOpenMenuId(null); }}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                                                        >
                                                            <Trash2 size={16} /> Delete Task
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}

                        </tbody>

                    </table>
                </div>


                :

                <div className="w-full py-10  flex flex-col items-center justify-center space-y-4">
                    {/* Icon container */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-full">
                        <ClipboardList size={48} className="text-slate-300 dark:text-slate-600" />
                    </div>

                    {/* Text logic */}
                    <div className="text-center space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            No tasks found
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[250px] mx-auto">
                            It looks like there are no tasks here. Start by creating a new one!
                        </p>
                    </div>

                    {/* Quick Action Button (Optional) */}
                    {/* <button
                        onClick={() => setIsClickOnNewTask(true)}
                        className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-orange-200 dark:shadow-none"
                    >
                        <Plus size={18} />
                        Create First Task
                    </button> */}
                </div>


            }
        </>

    );
};

export default TaskList;