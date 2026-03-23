import React, { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd';
import { Plus, MoreHorizontal, Calendar, Clock, Layout, AlignLeft, ShieldCheck, MessageSquareMore } from 'lucide-react';
import TaskComment from '../kanban board/TaskComment';
function DraggableTasks({ column, activeTaskId, getCommentsForTask, setActiveTaskId, commentText, setCommentText, handleCommentChange, commentsForTask }) {

    const [showMenu, setShowMenu] = useState(false);

    return (

        <div>
            {column.items.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided, snapshot) => (
                        <>
                            <div ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`bg-white dark:bg-[#161B26] p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 shadow-sm transition-all hover:border-indigo-500/50 hover:shadow-md ${snapshot.isDragging ? 'rotate-2 shadow-2xl ring-2 ring-indigo-500/50 z-50' : ''
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

                                    {/* Task Options Dropdown  */}
                                    
                                    <div className='relative'>

                                        {/* button  */}
                                        <button
                                            onClick={() => setShowMenu(prev => !prev)}
                                            className=" text-slate-300 hover:text-slate-500 transition-colors">
                                            <MoreHorizontal className="w-4 h-4 cursor-pointer " />
                                        </button>

                                        {/* menu  */}
                                        {showMenu && (

                                            <div className="absolute right-0 mt-0 w-40 bg-purple-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-md shadow-xl z-30 p-1.5 overflow-hidden animate-in fade-in zoom-in duration-150">
                                                <button
                                                    className="w-full flex items-center gap-3 rounded-md px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                                                    <MessageSquareMore size={14} className="text-blue-500" /> Report Issue
                                                </button>
                                                <button
                                                    className="w-full flex items-center gap-3 rounded-md px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                                                    <ShieldCheck size={14} className="text-green-500" /> Report Bug
                                                </button>

                                            </div>
                                        )}

                                    </div>
                                </div>

                                {/* title  */}
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2 leading-tight">
                                    {item.title}
                                </h4>

                                {/* description  */}
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

                            {/* comment section */}
                            <TaskComment activeTaskId={activeTaskId} item={item} getCommentsForTask={getCommentsForTask} setActiveTaskId={setActiveTaskId} commentText={commentText} setCommentText={setCommentText} handleCommentChange={handleCommentChange} commentsForTask={commentsForTask} />

                        </>

                    )}

                </Draggable>
            ))}
        </div>
    )
}

export default DraggableTasks