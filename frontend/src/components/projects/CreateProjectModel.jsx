import { useState } from 'react';
import { X, Layout, AlignLeft, Rocket, Tag, Activity } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { showToast } from "../../utils/toast.js"

const CreateProjectModal = () => {
    const { createProject, setIsClickOnNewProject } = useProject();

    const [formData, setFormData] = useState({
        name: 'zoho work deive',
        description: 'sdfsdfsdfsdfsdf',
        status: 'active',
        tags: []
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await createProject(
            formData.name,
            formData.description,
            formData.status,
            formData.tags
        );
        
        if (res?.success) {
            setLoading(false);
            showToast.success(res?.message || "Project created successfully!");
            setIsClickOnNewProject(false);
        } else {
            setLoading(false);
            console.log(res?.error);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsClickOnNewProject(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden transform transition-all border border-slate-100 dark:border-slate-800">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200 dark:shadow-none">
                            <Rocket size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-none">New Project</h2>
                            <p className="text-xs text-slate-500 mt-1">Fill in the details to get started.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsClickOnNewProject(false)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="p-6 space-y-5" onSubmit={handleSubmit}>

                    {/* Project Name */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 px-1">
                            <Layout size={14} className="text-indigo-500" /> Project Name
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. E-commerce Dashboard"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 px-1">
                            <AlignLeft size={14} className="text-indigo-500" /> Description
                        </label>
                        <textarea
                            rows="3"
                            placeholder="Briefly describe the goals of this project..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white resize-none placeholder:text-slate-400"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 px-1">
                                <Activity size={14} className="text-indigo-500" /> Status
                            </label>
                            <select
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white cursor-pointer appearance-none"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 px-1">
                                <Tag size={14} className="text-indigo-500" /> Tags
                            </label>
                            <input
                                type="text"
                                placeholder="React, API, UI"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                            />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={() => setIsClickOnNewProject(false)}
                            className="flex-1 px-4 py-3.5 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                        >
                            {loading ? 'Launching...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;