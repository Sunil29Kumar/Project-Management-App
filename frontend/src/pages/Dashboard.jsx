import StatCard from '../components/dashboard/StatCard';
import ProjectCard from '../components/dashboard/ProjectCard';
import { Briefcase, CheckCircle, Plus, Users, ListTodo, ArrowRight } from 'lucide-react';
import {  useProjectContext } from '../context/ProjectContext';
import { Link } from 'react-router-dom';
import {  useTaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const { projects, setIsClickOnNewProject } = useProjectContext();
  const { allProjectTasks, setIsClickOnNewTask } = useTaskContext()

  const activeProjects = projects?.filter(p => p.status === 'active');
  const taskCompleted = allProjectTasks?.filter(t => t.status === 'done');
  const totalTeamMember = projects?.reduce((acc, project) => acc + project?.members.length, 0);

  return (
    <div className="space-y-5 animate-in fade-in duration-500">

      {/* 1. Header Section */}
      <div className="flex  md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500">Welcome back! Monitoring your workspaces and team activity.</p>
        </div>

        <button
          className="flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95"
          onClick={() => setIsClickOnNewProject(true)}
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>

      {/* 2. Top Section: Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6  bg-gray-100 p-4 rounded-xl">
        <StatCard
          title="Total Projects"
          value={projects?.length || 0}
          icon={<Briefcase size={22} />}
          colorClass="bg-indigo-50 text-indigo-600"
          trend="All projects in system"
        />
        <StatCard
          title="Active Projects"
          value={activeProjects?.length || 0}
          icon={<Briefcase size={22} />}
          colorClass="bg-sky-50 text-sky-600"
          trend="Currently ongoing"
        />
        <StatCard
          title="Tasks Completed"
          value={taskCompleted?.length || 0}
          icon={<CheckCircle size={22} />}
          colorClass="bg-emerald-50 text-emerald-600"
          trend={`Out of ${allProjectTasks?.length} tasks`}
        />
        <StatCard
          title="Total Members"
          value={totalTeamMember || 0}
          icon={<Users size={22} />}
          colorClass="bg-rose-50 text-rose-600"
          trend={`In ${projects?.length} projects`}
        />
      </div>

      {/* 3. Main Split Layout: Projects (Left) & Tasks (Right) */}
      <div className="grid grid-cols-12 gap-10">

        {/* LEFT COLUMN: Recent Projects (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="flex items-center justify-start gap-10 px-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Recent Projects <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md">{projects?.length}</span>
            </h2>
            <Link to={"/projects"} className="text-indigo-600 text-sm font-bold hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
            {projects?.slice(0, 3).map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Tasks Overview (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-6   ">
          <div className="flex items-center justify-start gap-10 px-2">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Recent Tasks <ListTodo size={20} className="text-indigo-500" />
            </h2>
          </div>

          {/* Task Feed / Summary Card */}
          <div className="bg-gray-50 rounded-3xl border border-slate-100 p-6 shadow-sm ">
            <div className="space-y-4">
              {/* Placeholder for Task list - Industry Standard list view */}
              {allProjectTasks?.slice(0, 4).map((item) => (
                <div key={item} className="flex items-center gap-4 p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    <CheckCircle size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-700">Update Dashboard UI</p>
                    <p className="text-[11px] text-slate-400">Project: DevSync • High Priority</p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400">2h ago</div>
                </div>
              ))}

              <button
                  onClick={() => setIsClickOnNewTask(true)}
                className="w-full py-3 mt-4 cursor-pointer border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-bold hover:border-indigo-300 hover:text-indigo-500 transition-all">
                + Add New Task
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;