import { useEffect, useState } from 'react';
import { X, Layout, AlignLeft, Target, Activity, Calendar, User, Briefcase } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { useProjectContext } from '../../context/ProjectContext';
import { showToast } from "../../utils/toast.js";
import { useTask } from '../../hooks/useTask.js';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext.jsx';

const CreateTaskModal = () => {
    const { createTask } = useTask();
    const { setIsClickOnNewTask, getAllTasks, getTasksByProjectId, loading } = useTaskContext();
    const { projects } = useProjectContext();
    const { user } = useUserContext()
    const { projectId } = useParams()
    console.log(projectId);


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        projectId: projectId || '',
        priority: 'medium',
        status: 'todo',
        dueDate: new Date().toISOString().split('T')[0],
        assignedTo: '',
        assigneerRole: 'developer'
    });

    useEffect(() => {
        if (projectId) {
            setFormData(prev => ({ ...prev, projectId: projectId }));
        }
    }, [projectId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!formData.projectId) return showToast.error("Please select a project");
        const dataToSend = {
            ...formData,
            dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined
        };

        const res = await createTask(dataToSend.projectId, dataToSend);
        console.log(res);
        
        if (res && res.success === true) {
            await getTasksByProjectId(projectId);
            setIsClickOnNewTask(false);
        }
    }

    // useEffect(() => {
    //     getAllTasks()

    // }, []);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
                onClick={() => setIsClickOnNewTask(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden transform transition-all border border-slate-100 dark:border-slate-800 flex flex-col max-h-[95vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                            <Target size={22} />
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">Create Task</h2>
                            <p className="text-xs font-medium text-slate-500">Plan and assign work to your team</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsClickOnNewTask(false)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form Body - Scrollable */}
                <form className="px-6  space-y-5 overflow-y-auto custom-scrollbar" onSubmit={handleSubmit}>

                    {/* Task Title */}
                    <div className="space-y-1.5">
                        <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 px-1">
                            Task Title
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. Design System Implementation"
                            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-white placeholder:text-slate-400 font-medium"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Project Selection */}
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 px-1">
                                <Layout size={14} className="text-indigo-500" /> Project
                            </label>
                            <select
                                required
                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white cursor-pointer font-medium appearance-none"
                                value={formData.projectId}
                                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                            >
                                {projectId ? (
                                    <option value={projectId}>
                                        {projects?.find(p => p._id === projectId)?.name || "Selected Project"}
                                    </option>
                                ) : (
                                    <>
                                        <option value="">Select Project</option>
                                        {projects?.map(project => (
                                            project.owner._id === user._id &&
                                            <option key={project?._id} value={project?._id}>{project?.name}</option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>

                        {/* Due Date */}
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 px-1">
                                <Calendar size={14} className="text-indigo-500" /> Due Date
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white font-medium"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1.5">
                        <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 px-1">
                            <AlignLeft size={14} className="text-indigo-500" /> Description
                        </label>
                        <textarea
                            rows="3"
                            placeholder="Detailed requirements or notes..."
                            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white resize-none font-medium"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Priority */}
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 px-1">
                                <Activity size={14} className="text-indigo-500" /> Priority
                            </label>
                            <select
                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white cursor-pointer font-medium"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="critical">Critical</option>
                            </select>
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 px-1">
                                <Target size={14} className="text-indigo-500" /> Status
                            </label>
                            <select
                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white cursor-pointer font-medium"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="todo">Todo</option>
                                <option value="in-progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Assigned To */}
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 px-1">
                                <User size={14} className="text-indigo-500" /> Assign To
                            </label>
                            <select
                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white cursor-pointer font-medium"
                                value={formData.assignedTo}
                                required
                                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                            >
                                <option value="">Select Member</option>
                                {projects?.find(p => p._id === (formData.projectId || projectId))?.members?.map(member => (
                                    <option key={member._id} value={member._id}>
                                        {member.name} {member._id === projects.find(p => p._id === (formData.projectId || projectId))?.owner?._id ? "(Owner)" : ""}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Role Assigner */}
                        <div className="space-y-1.5">
                            <label className="text-[12px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-2 px-1">
                                <Briefcase size={14} className="text-indigo-500" /> Assignee Role
                            </label>
                            <select
                                className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white cursor-pointer font-medium"
                                value={formData.assigneerRole}
                                onChange={(e) => setFormData({ ...formData, assigneerRole: e.target.value })}
                            >
                                <option value="developer">Developer</option>
                                <option value="qa/tester">QA/Tester</option>
                                <option value="designer">Designer</option>
                                <option value="devops">DevOps</option>
                                <option value="manager">Manager</option>
                                <option value="lead">Lead</option>
                            </select>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 py-5 sticky  bottom-0 bg-white dark:bg-slate-900 ">
                        <button
                            type="button"
                            onClick={() => setIsClickOnNewTask(false)}
                            className="flex-1 px-4 py-4 rounded-2xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] px-4 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </>
                            ) : 'Create Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;