import { Bell, Moon, Sun, LogOut, Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const TopNav = () => {
  const { logout, user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search projects..." 
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>

      {/* Right Corner Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition">
          <Sun size={20} />
        </button>
        
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{user?.name || "Developer"}</p>
            <p className="text-xs text-slate-500">Free Plan</p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition ml-2"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopNav