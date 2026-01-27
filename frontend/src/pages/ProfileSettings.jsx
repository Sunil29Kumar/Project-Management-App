import { useState } from "react";
import { User, Mail, Lock, Camera, Save, ShieldCheck, BadgeCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const ProfileSettings = () => {
  const { user } = useAuth();

  return (
    <div className=" mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 py-5 px-2 ">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Account Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Update your personal information and security preferences.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-500/10 rounded-2xl border border-blue-100 dark:border-blue-500/20">
          <ShieldCheck className="text-blue-600 dark:text-blue-400" size={20} />
          <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Account Secured</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT COLUMN: Profile Card --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-[#161b22] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm text-center relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 dark:opacity-20"></div>
            
            <div className="relative pt-4">
              <div className="relative w-32 h-32 mx-auto mb-5">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#0d1117] flex items-center justify-center text-4xl font-black text-blue-600 dark:text-blue-400 overflow-hidden">
                    {user?.name?.charAt(0) || "S"}
                  </div>
                </div>
                <button className="absolute bottom-1 right-1 p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-xl transition-all hover:scale-110 active:scale-95 border-4 border-white dark:border-[#161b22] cursor-pointer">
                  <Camera size={18} />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-xl font-bold dark:text-white">{user?.name || "Sunil Kumar"}</h3>
                <BadgeCheck size={20} className="text-blue-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-widest">
                Developer Plan
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-around">
               <div>
                  <p className="text-xl font-bold dark:text-white">12</p>
                  <p className="text-xs text-slate-500">Projects</p>
               </div>
               <div className="w-px h-10 bg-slate-100 dark:bg-slate-800"></div>
               <div>
                  <p className="text-xl font-bold dark:text-white">48</p>
                  <p className="text-xs text-slate-500">Tasks</p>
               </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Detailed Forms --- */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section: Basic Info */}
          <div className="bg-white dark:bg-[#161b22] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
                  <User size={22} className="text-blue-600 dark:text-blue-400" />
               </div>
               <h2 className="text-xl font-bold dark:text-white">General Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                <div className="group relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter your name"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input 
                    type="email" 
                    placeholder="example@devsync.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <button className="mt-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer">
              <Save size={20} /> Save Changes
            </button>
          </div>

          {/* Section: Security */}
          <div className="bg-white dark:bg-[#161b22] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2.5 bg-red-50 dark:bg-red-500/10 rounded-xl">
                  <Lock size={22} className="text-red-600 dark:text-red-400" />
               </div>
               <h2 className="text-xl font-bold dark:text-white">Security & Password</h2>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Current Password</label>
                <input 
                  type="password" 
                  className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white outline-none focus:border-red-500 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">New Password</label>
                  <input 
                    type="password" 
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <button className="mt-8 bg-slate-900 dark:bg-white dark:text-[#0b0e14] text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-all active:scale-95 cursor-pointer">
              Update Password
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;