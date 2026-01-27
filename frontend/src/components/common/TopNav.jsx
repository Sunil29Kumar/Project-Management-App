import { Bell, Moon, Sun, LogOut, Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

const TopNav = ({setIsClickOnLogout , isClickOnLogout}) => {
  const { logout, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  console.log(isClickOnLogout);
  

  return (
    <header className="h-16  flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="relative w-150">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search projects..." 
          className="w-full text-md pl-10 pr-4 py-3 bg-white border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none "
        />
      </div>

      {/* Right Corner Actions */}
      <div className="flex items-center gap-2 ">
        <button 
          onClick={toggleTheme}
          className="p-2 text-slate-500 cursor-pointer hover:bg-slate-50 rounded-full transition"
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button title="Notifications" className="p-2 text-slate-500 cursor-pointer hover:bg-slate-50 rounded-full relative transition">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>


        <div className="flex items-center gap-3 ">

          <button 
            onClick={() => setIsClickOnLogout(true)}
            className="flex items-center  cursor-pointer gap-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition ml-2"
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