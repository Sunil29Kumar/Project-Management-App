import { Plus, LayoutGrid, List } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';

const ProjectHeader = () => {
    const {setIsClickOnNewProject} = useProject();
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">All Projects</h1>
        <p className="text-slate-500 mt-1">Manage and monitor all your team workspaces.</p>
      </div>

      <div className="flex items-center gap-3">

        
        <button className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 dark:shadow-none" onClick={() => setIsClickOnNewProject(true)}>
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectHeader;