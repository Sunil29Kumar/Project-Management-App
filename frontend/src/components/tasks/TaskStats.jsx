import { Clock, CheckCircle2, AlertCircle, ListTodo } from 'lucide-react';
import { useTask } from '../../context/TaskContext';

const TaskStats = () => {

  const { allProjectTasks } = useTask();

  // 1. Pehle counts nikaal lo
  const total = allProjectTasks?.length;

  const inProgress = allProjectTasks?.filter(t =>
    t.status?.toLowerCase() === "in progress" || t.status?.toLowerCase() === "in-progress"
  )?.length;

  const todo = allProjectTasks?.filter(t =>
    t.status?.toLowerCase() === "todo" || t.status?.toLowerCase() === "to-do"
  )?.length;

  const completed = allProjectTasks?.filter(t =>
    t.status?.toLowerCase() === "done" || t.status?.toLowerCase() === "completed"
  )?.length;

  const stats = [
    { label: 'Total Tasks', value: total, icon: <ListTodo size={20} />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Overdue', value: todo, icon: <AlertCircle size={20} />, color: 'text-rose-600', bg: 'bg-rose-50' },
    { label: 'In Progress', value: inProgress, icon: <Clock size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed', value: completed, icon: <CheckCircle2 size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;