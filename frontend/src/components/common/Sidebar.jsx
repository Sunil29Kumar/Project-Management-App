import { LayoutDashboard, FolderKanban, CheckSquare, Settings, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <FolderKanban size={20} />, label: "Projects", path: "/projects" },
    { icon: <CheckSquare size={20} />, label: "Tasks", path: "/tasks" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg"></div> DevSync
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              location.pathname === item.path 
              ? "bg-blue-50 text-blue-600" 
              : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-500 hover:text-blue-600 transition">
          <HelpCircle size={20} /> Support
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;