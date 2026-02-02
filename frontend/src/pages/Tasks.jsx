import {  useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import TaskStats from '../components/tasks/TaskStats';
import TaskList from '../components/tasks/TaskList';
import {  useTaskContext } from '../context/TaskContext';

const Tasks = () => {

    const { allProjectTasks , isClickOnNewTask, setIsClickOnNewTask } = useTaskContext();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTasks = allProjectTasks?.filter((task) => {
        return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    })


    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tasks</h1>
                    <p className="text-slate-500">Manage and track your personal and team responsibilities.</p>
                </div>
                <button onClick={() => setIsClickOnNewTask(true)} className="flex items-center cursor-pointer justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-100 active:scale-95">
                    <Plus size={20} />
                    <span>Add New Task</span>
                </button>
            </div>

            {/* Task Summary Cards */}
            <TaskStats />

            {/* Filters & Search */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold border border-slate-100 dark:border-slate-700">
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* Task List Table */}
            <div className="">
                <TaskList filteredTasks={filteredTasks} />
            </div>

        </div>
    );
};

export default Tasks;