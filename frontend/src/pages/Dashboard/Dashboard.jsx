import { LayoutDashboard, CheckCircle2, Clock, Users, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Total Projects", value: "12", icon: <LayoutDashboard className="text-blue-600" />, bg: "bg-blue-50 dark:bg-blue-500/10" },
    { label: "Active Tasks", value: "24", icon: <Clock className="text-orange-600" />, bg: "bg-orange-50 dark:bg-orange-500/10" },
    { label: "Completed", value: "85%", icon: <CheckCircle2 className="text-green-600" />, bg: "bg-green-50 dark:bg-green-500/10" },
    { label: "Total Team", value: "08", icon: <Users className="text-purple-600" />, bg: "bg-purple-50 dark:bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* --- WELCOME HEADER --- */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back, Sunil! 👋</h1>
        <p className="text-slate-500 dark:text-slate-400">Here's what's happening with your projects today.</p>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-[#161b22] p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-xs font-bold flex items-center bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-lg">
                <ArrowUpRight size={14} /> +12%
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
            <h2 className="text-2xl font-bold dark:text-white mt-1">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* --- RECENT PROJECTS SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Tasks List */}
        <div className="lg:col-span-2 bg-white dark:bg-[#161b22] p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold dark:text-white">Recent Projects</h2>
            <button className="text-blue-600 text-sm font-bold hover:underline cursor-pointer">View All</button>
          </div>
          
          <div className="space-y-4">
            {/* Example Project Item */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center font-bold text-blue-600">D</div>
                  <div>
                    <p className="font-bold text-sm dark:text-white">DevSync Landing Page</p>
                    <p className="text-xs text-slate-500">Deadline: 28 Jan 2026</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-orange-100 dark:bg-orange-500/10 text-orange-600 text-[10px] font-black uppercase rounded-full">In Progress</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Quick Summary */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-blue-500/20">
            <div>
              <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
              <p className="text-blue-100 text-sm leading-relaxed">Get unlimited projects and advanced team collaboration tools.</p>
            </div>
            <button className="mt-8 bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-50 transition active:scale-95 cursor-pointer">
              Go Premium
            </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;