import { LogOut, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useRef } from "react";

const Logout = ({ setIsClickOnLogout }) => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Maan lete hain aapka logout function yahan hai

    const logoutRef = useRef(null);


    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login"); // Logout ke baad seedha login par
        } catch (error) {
            console.error("Logout failed", error);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (logoutRef.current && !logoutRef.current.contains(event.target)) setIsClickOnLogout(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsClickOnLogout]);

    return (
        <div  className="w-screen absolute h-screen z-100 bg-black/30 flex items-center justify-center p-4 transition-colors">
            <div ref={logoutRef} className="max-w-md w-full bg-white dark:bg-[#161b22] rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8 text-center">

                {/* Animated Icon */}
                <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600 animate-pulse">
                    <LogOut size={40} />
                </div>

                {/* Text Content */}
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Oh no! Leaving so soon?
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    Are you sure you want to log out of your DevSync account?
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 cursor-pointer hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-red-500/30"
                    >
                        Yes, Log Me Out
                    </button>

                    <button
                        onClick={() => setIsClickOnLogout(false)}
                        className="w-full flex items-center cursor-pointer justify-center gap-2 text-slate-600 dark:text-slate-400 font-medium py-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                    >
                        <ArrowLeft size={18} /> Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;