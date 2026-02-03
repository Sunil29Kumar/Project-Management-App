import { useState } from 'react';
import { X, Layout, AlignLeft, Rocket, Tag, Activity, Mail, Users, Plus } from 'lucide-react';
import { useProject } from '../../hooks/useProject.js';
import { useProjectContext } from '../../context/ProjectContext.jsx';

const CreateProjectModal = () => {
    const { createProject, loading, inviteMemberToProject } = useProject();
    const { setInviteMembers , setIsClickOnNewProject} = useProjectContext();
    const { projects } = useProjectContext()

    const [tagInput, setTagInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [invalidEmailMessage, setInvalidEmailMessage] = useState('');


    console.log(emailInput);


    const [formData, setFormData] = useState({
        name: 'zoho work drive coke',
        description: 'is project me clone karna hay zoho work drive ko',
        status: 'active',
        tags: [],
        invitedMembers: [], // Dropdown se select kiye gaye log
        members: [ 'deep.kksdk@gmail.com','backenddomination999@gmail.com']  // Naye emails jo type kiye gaye
    });


    const handleValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleEmailAdd = () => {
        if (!handleValidEmail(emailInput)) {
            setInvalidEmailMessage(` ${emailInput} is not a valid email address. Please enter a valid email address.`);
            return;
        }
        if (emailInput && !formData.members.includes(emailInput) && handleValidEmail(emailInput)) {

            setFormData({
                ...formData,
                members: [...formData.members, emailInput]
            });
            setEmailInput('');
            setInvalidEmailMessage('');
        }
    }

    const handleRemoveEmail = (emailToRemove) => {
        setFormData({
            ...formData,
            members: formData.members.filter(email => email !== emailToRemove)
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            tags: tagInput ? tagInput.split(',').map(tag => tag.trim()).filter(t => t !== "") : []
        };
        const response = await createProject(finalData);
        console.log("adasdf =",response);
        console.log(response.project._id);
        console.log(formData.members);
        
        
        if (response && response.success && formData.members.length > 0) {
            await inviteMemberToProject(response.project._id, formData.members);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsClickOnNewProject(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative flex flex-col bg-white dark:bg-slate-900 w-full max-w-xl  h-[95vh] overflow-hidden rounded-3xl shadow-2xl transform transition-all border border-slate-100 dark:border-slate-800 ">

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
                <form className="p-6 space-y-5 overflow-x-auto " onSubmit={handleSubmit}>

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

                    {/* TEAM INVITATION SECTION */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Users size={16} className="text-indigo-500" /> Invite Team Members
                        </h3>

                        {/* Dropdown for Existing Members */}
                        {/* <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 px-1">Select from Team</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white outline-none focus:border-indigo-500 transition-all cursor-pointer"
                                onChange={(e) => { }}
                            >
                                <option value="">Choose a member...</option>
                                <option value="u1">Aman Singh (am@example.com)</option>
                                <option value="u2">Rahul Verma (rv@example.com)</option>
                            </select>
                        </div> */}

                        {/* Invite by Email */}
                        <div className="space-y-2">
                            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 px-1">Invite by Email</label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder="colleague@company.com"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white outline-none focus:border-indigo-500 transition-all"
                                        value={emailInput}
                                        onChange={(e) => setEmailInput(e.target.value)}
                                    />

                                </div>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-bold hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
                                    onClick={() => { handleEmailAdd(); }}
                                >
                                    <Plus size={18} /> Add
                                </button>

                            </div>
                            {invalidEmailMessage && (
                                <p className="text-red-500 text-xs mt-1">{invalidEmailMessage}</p>
                            )}
                        </div>

                        {/* Selected List (Visual Only for now) */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {formData.members.map((email, i) => (
                                <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full flex items-center gap-2 border border-indigo-200 dark:border-indigo-500/30">
                                    {email} <X size={12} className="cursor-pointer" onClick={() => handleRemoveEmail(email)} />
                                </span>
                            ))}
                        </div>

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
                                required
                                placeholder="React, API, UI"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all dark:text-white placeholder:text-slate-400"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="flex gap-3 pt-4 border-t  z-100 border-slate-100 dark:border-slate-800">
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