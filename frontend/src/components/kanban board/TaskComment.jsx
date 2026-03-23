import React from 'react'
import { MessageSquareMore } from 'lucide-react'

function TaskComment({ activeTaskId, item, getCommentsForTask, setActiveTaskId, commentText, setCommentText, handleCommentChange, commentsForTask }) {
    return (
        <div>
            {/* comment section */}
            <div className='w-full mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/50'>
                {activeTaskId !== item._id ? (
                    <div
                        onClick={() => {
                            getCommentsForTask(item._id);
                            setActiveTaskId(item._id)
                        }}
                        className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all cursor-pointer group"
                    >
                        <div className="p-1.5 rounded-lg group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10 transition-colors">
                            <MessageSquareMore size={16} />
                        </div>
                        <span className="text-[11px] font-bold tracking-tight">
                            {item.commentsCount || 0} Comments
                        </span>
                    </div>
                ) : (
                    <div className='space-y-3 animate-in fade-in slide-in-from-top-2 duration-200'>
                        {/* Input Box Area */}
                        <div className='bg-slate-50 dark:bg-slate-900/40 p-2 rounded-xl border border-slate-200 dark:border-slate-800'>
                            <textarea
                                autoFocus
                                placeholder='Write a response...'
                                className='w-full bg-white dark:bg-slate-800 p-2.5 rounded-lg text-[12px] border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none min-h-[60px]'
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    onClick={() => setActiveTaskId(null)}
                                    className='px-3 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-all'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCommentChange}
                                    disabled={!commentText.trim()}
                                    className='px-4 py-1.5 text-[11px] bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                                >
                                    Reply
                                </button>
                            </div>
                        </div>

                        {/* Comments List Area */}
                        <div className='max-h-[180px] overflow-y-auto pr-1 space-y-3 custom-scrollbar'>
                            {commentsForTask.length > 0 ? (
                                commentsForTask.map(comment => (
                                    <div key={comment._id} className="flex gap-2 group items-start">
                                        {/* User Avatar Initial */}
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300 shadow-sm border border-white dark:border-slate-800">
                                            {comment.userId?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>

                                        <div className="flex-1 bg-white dark:bg-slate-800/50 p-2.5 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700/50 shadow-sm">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter">
                                                    {comment.userId?.name || 'Anonymous'}
                                                </span>
                                                <span className="text-[9px] font-medium text-slate-400">
                                                    {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[10px] text-center text-slate-400 font-medium py-2 italic">No comments yet. Start the conversation!</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TaskComment