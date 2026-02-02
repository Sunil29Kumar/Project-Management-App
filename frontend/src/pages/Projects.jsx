import { useRef, useState } from 'react';
import ProjectHeader from '../components/projects/ProjectHeader';
import ProjectFilters from '../components/projects/ProjectFilters';
import ProjectCard from '../components/dashboard/ProjectCard'; // Reusing your improved card
import { Folder } from 'lucide-react';
import { useProjectContext } from '../context/ProjectContext';
import UpdateProjectModal from '../components/projects/UpdateProjectModal';
import { useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';

const Projects = () => {

  const { projects, isClickOnUpdateProject, getAllProjects } = useProjectContext();
  const { projectTasks, getTasksByProjectId, } = useTaskContext()

  const [filter, setFilter] = useState('all');

  const filteredProjects = projects?.filter(p =>
    filter === 'all' ? true : p.status === filter
  );

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div className="space-y-8 p-2">
      <ProjectHeader />

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <ProjectFilters activeFilter={filter} setFilter={setFilter} />

        <div className="text-sm text-slate-500 font-medium">
          Showing <span className="text-indigo-600">{filteredProjects?.length}</span> Projects
        </div>

      </div>

      {filteredProjects && filteredProjects?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} getTasksByProjectId={getTasksByProjectId} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <Folder size={40} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No projects found</h3>
          <p className="text-slate-500">Try adjusting your filters or create a new project.</p>
        </div>
      )}


      {isClickOnUpdateProject && <UpdateProjectModal />}

    </div>
  );
};

export default Projects;