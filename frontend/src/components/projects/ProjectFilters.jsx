const ProjectFilters = ({ activeFilter, setFilter }) => {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Ongoing' },
    { id: 'archived', label: 'Archived' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex items-center gap-1">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeFilter === f.id
              ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;