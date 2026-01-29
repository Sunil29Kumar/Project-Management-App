import { useState } from 'react';
import { Calendar, MoreVertical, ArrowRight, Pencil, Trash2, Star, Share2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useProject } from '../../context/ProjectContext';

const ProjectCard = ({ project }) => {

  const { setIsClickOnUpdateProject, handleEditClick,deleteProject } = useProject();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  // --- Smart Date Formatter ---
  const getRelativeTime = (dateString) => {
    if (!dateString) return "Just now";
    const now = new Date();
    const updated = new Date(dateString);
    const diffInSeconds = Math.floor((now - updated) / 1000);
    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return updated.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  const formattedTime = getRelativeTime(project.updatedAt);

  return (
    <div
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all duration-300 flex flex-col h-full relative"
      onMouseLeave={() => setShowMenu(false)} // Menu auto-close on leave
    >

      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center text-xs text-slate-400 font-medium tracking-wide">
            <Calendar size={12} className="mr-1 text-indigo-500" />
            Updated {formattedTime}
          </div>
        </div>

        {location.pathname === '/projects' && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${showMenu ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
            >
              <MoreVertical size={18} />
            </button>

            {/* ACTION DROPDOWN */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-30 py-1.5 overflow-hidden animate-in fade-in zoom-in duration-150">
                <button
                  onClick={() => {
                    handleEditClick(project)
                    setIsClickOnUpdateProject(true)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                  <Pencil size={14} className="text-blue-500" /> Update Project
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                  <Star size={14} className="text-amber-500" /> Mark Favorite
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                  <Share2 size={14} className="text-indigo-500" /> Share Project
                </button>
                <div className="h-[1px] bg-slate-100 dark:bg-slate-700 my-1"></div>
                <button onClick={() => deleteProject(project._id)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer font-medium">
                  <Trash2 size={14} /> Delete Project
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed font-medium">
        {project.description || 'No description provided for this project.'}
      </p>

      {/* Bottom Section */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-50 dark:border-slate-800 mt-auto">
        <div className="flex -space-x-2.5">
          {[1, 2, 3].map((m) => (
            <img
              key={m}
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${m + project.name}`}
              className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 shadow-sm"
              alt="team"
            />
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400 shadow-sm">
            +2
          </div>
        </div>

        <button className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 cursor-pointer shadow-sm group-hover:shadow-indigo-200">
          Open
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Admin Badge */}
      <div className="absolute top-0 right-12 transform -translate-y-1/2">
        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shadow-md ${project.role === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-white dark:bg-slate-800 text-indigo-600 border border-indigo-100 dark:border-slate-700'
          }`}>
          {project.role || 'Admin'}
        </span>
      </div>


    </div>
  );
};

export default ProjectCard;