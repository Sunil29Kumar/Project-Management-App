import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ListTodo
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useLayout } from "../../context/LayoutContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { isMinimized, toggleSidebar } = useLayout();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <FolderKanban size={20} />, label: "Projects", path: "/projects" },
    { icon: <CheckSquare size={20} />, label: "Tasks", path: "/tasks" },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },

  ];

  return (
    <div className={`h-screen bg-white dark:bg-[#161b22] fixed left-0 top-0 flex flex-col rounded-r-4xl border-r border-slate-100 dark:border-slate-800 transition-all duration-300 z-50 ${isMinimized ? "w-20" : "w-64"}`}>

      {/* 1. Header Section - Logo only on minimize */}
      <div className={`p-6 flex items-center ${isMinimized ? "justify-center" : "justify-start"}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg shrink-0"></div>
          {!isMinimized && (
            <span className="text-2xl font-bold text-blue-600 truncate">DevSync</span>
          )}
        </div>
      </div>

      {/* 2. Navigation Section */}
      <nav className="flex-1 px-3 space-y-2 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 py-3 rounded-xl transition-all font-medium ${
              isMinimized ? "justify-center px-0" : "px-4"
            } ${location.pathname === item.path
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <span className="shrink-0">{item.icon}</span>
            {!isMinimized && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* 3. Footer Section - Profile above, Button below */}
      <div className={`flex ${isMinimized ? "flex-col" :""}   items-center justify-between p-3 border-t border-slate-100 dark:border-slate-800 gap-4   `}>
        
        {/* Profile Section */}
        <button className={`flex items-center gap-3 w-full rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition group cursor-pointer ${isMinimized ? "justify-center p-1" : "p-2 text-left"}`}>

          <div className="w-12 h-12  rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-white dark:border-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shrink-0">
            {user?.name?.charAt(0) || "U"}
          </div>

          {!isMinimized && (
            <div className="flex-1 overflow-hidden  ">
              <p className="text-sm font-bold text-slate-900 dark:text-white  truncate">
                {user?.name || "User Name"}
              </p>
              <p className="text-xs text-slate-500 truncate">Free Account</p>
            </div>
          )}
        </button>

        {/* Minimize Button - Sabse niche */}
        <button
          onClick={toggleSidebar}
          className={`p-2 text-slate-400  cursor-pointer hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-all `}
        >
          {isMinimized ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

      </div>
    </div>
  );
};

export default Sidebar;