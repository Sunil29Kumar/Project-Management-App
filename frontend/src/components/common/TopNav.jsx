import { Bell, Moon, Sun, LogOut, Search } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../context/ThemeContext";

const TopNav = ({setIsClickOnLogout , isClickOnLogout}) => {
  
  const { logout, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  console.log(isClickOnLogout);
  

  return (
    <header className=" flex items-center justify-end px-6 sticky top-0 z-10  ">

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