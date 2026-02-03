import React, { useState } from 'react'
import { Mail, Plus, X, UserPlus, Shield, Info } from 'lucide-react'
import { useProjectContext } from '../../context/ProjectContext'
import { useProject } from '../../hooks/useProject'

function InviteMultipleMembers() {

    const { inviteMembers, setInviteMembers ,projects} = useProjectContext()
    const { inviteMultipleMembersToProject } = useProject()

    const [emailInput, setEmailInput] = useState('');
    const [invalidEmailMessage, setInvalidEmailMessage] = useState('');

    const [emails, setEmails] = useState([]); // Ye state ab use nahi ho rahi lagta hai

    console.log("inviteMembers = ", inviteMembers);
    console.log(emails);


    const handleValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleEmailAdd = () => {
        if (!handleValidEmail(emailInput)) {
            setInvalidEmailMessage(` ${emailInput} is not a valid email address. Please enter a valid email address.`);
            return;
        }
        if (emailInput && !emails.includes(emailInput) && handleValidEmail(emailInput)) {

            setEmails([...emails, emailInput]); // Ye line ab use nahi ho rahi lagta hai
            setEmailInput('');
            setInvalidEmailMessage('');
        }
    }

    const handleRemoveEmail = (emailToRemove) => {
        setEmails(emails.filter(email => email !== emailToRemove));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await inviteMultipleMembersToProject(inviteMembers.projectId, emails);
        // console.log(response.data);

        if (response?.success) {
            console.log("Invite Sent:", response.data);
            setInviteMembers({ isClickOnInviteMembers: false, projectId: null });
        }
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                onClick={() => setInviteMembers({ isClickOnInviteMembers: false, projectId: null })}
            ></div>

            {/* Modal Content */}
            <form
                onSubmit={handleSubmit}
                className="relative flex flex-col bg-white dark:bg-slate-900 w-full max-w-xl  overflow-hidden rounded-3xl shadow-2xl transform transition-all border border-slate-100 dark:border-slate-800 ">

                {/* 1. Header Section */}
                <div className=" p-8 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-2xl flex items-center justify-center">
                            <UserPlus className="text-indigo-600 dark:text-indigo-400" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-800 dark:text-white tracking-tight">Add Members to <span className='text-md font-semibold text-purple-400'>{projects.find(proj => proj._id === inviteMembers.projectId)?.name}</span></h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Grow your project's workforce</p>
                        </div>
                    </div>
                </div>

                {/* 2. Input Section */}
                <div className="px-8 space-y-6">

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
                        {emails.map((email, i) => (
                            <span key={i} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-full flex items-center gap-2 border border-indigo-200 dark:border-indigo-500/30">
                                {email} <X size={12} className="cursor-pointer" onClick={() => handleRemoveEmail(email)} />
                            </span>
                        ))}
                    </div>

                </div>

                {/* 5. Footer Actions */}
                <div className="p-8 mt-2 flex items-center justify-end gap-5">
                    <button
                        onClick={() => setInviteMembers({ isClickOnInviteMembers: false, projectId: null })}
                        className="text-sm cursor-pointer font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        Cancel
                    </button>
                    <button type='submit' className="px-10 py-3.5 cursor-pointer bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all active:scale-95 shadow-xl">
                        Send Invites
                    </button>
                </div>
            </form>
        </div>
    )
}

export default InviteMultipleMembers