import React from 'react'
import { Calendar, Layout, MoreHorizontal, Plus, ShieldCheck } from 'lucide-react'
function BoardHeader({selectedProject , isProjectOwner , setIsClickOnNewTask}) {
  return (
    <div>
                    <header className="w-full flex  md:flex-row justify-between items-start md:items-center px-8 py-6 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm z-20 gap-6">
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
                            {selectedProject?.members?.slice(0, 3).map((m, i) => (
                                // <img
                                //     key={m}
                                //     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m + selectedProject.name}`}
                                //     className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 shadow-sm object-cover"
                                //     alt="member"
                                // />
                                <div
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold border-2 border-white dark:border-slate-800 shadow-sm"
                                >
                                    <h1>{m?.name?.slice(0, 1)}</h1>

                                </div>
                            ))}
                            {selectedProject?.members?.length > 3 && (
                                <div className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                    +{selectedProject.members.length - 3}
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
    </div>
  )
}

export default BoardHeader