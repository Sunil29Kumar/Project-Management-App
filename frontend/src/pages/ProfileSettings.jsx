import { useState, useEffect } from "react";
import { User, Mail, Lock, Camera, Save, ShieldCheck, BadgeCheck, Eye, EyeOff } from "lucide-react";
import { useUserContext } from "../context/UserContext";
import { useUser } from "../hooks/useUser";
import { showToast } from "../utils/toast";



const ProfileSettings = () => {
  const { user } = useUserContext();
  const { updateUserNameEmail, changePassword, updateUserAvatar } = useUser();

  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || "");

  // Inputs State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Password State
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Show/Hide Password State
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Sync state with user data when it loads
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!name || !email) return showToast.error("Name and Email are required");
    await updateUserNameEmail(name, email);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast.error("Passwords do not match!");
      return;
    }
    const response = await changePassword(oldPassword, newPassword);
    console.log(response);

    if (response?.success) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };


  return (
    <div className="mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 py-5 px-2">

      {/* --- HEADER SECTION --- */}
      <div className="flex  md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Update your personal information and security.</p>
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

            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10 dark:opacity-20"></div>

            <div className="relative pt-4">
              <div className="relative w-32 h-32 mx-auto mb-5">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 p-1">
                  <div className="w-full h-full rounded-full bg-white dark:bg-[#0d1117] flex items-center justify-center text-4xl font-black text-blue-600 dark:text-blue-400 overflow-hidden uppercase">
                    {name?.charAt(0) || "U"}
                  </div>
                </div>
                {/* UploadButton replaces the old Camera button */}
                <div className="absolute bottom-1 right-1">

                </div>

              </div>

              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-xl font-bold dark:text-white">{name || "User"}</h3>
                <BadgeCheck size={20} className="text-blue-500" />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 uppercase tracking-widest text-xs">Developer Plan</p>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Forms --- */}
        <div className="lg:col-span-8 space-y-6">

          {/* Section: General Info */}
          <div className="bg-white dark:bg-[#161b22] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
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
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={18} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                <div className="group relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleProfileUpdate} className="mt-8 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg cursor-pointer transition-all active:scale-95">
              <Save size={20} /> Save Changes
            </button>
          </div>

          {/* Section: Security */}
          <div className="bg-white dark:bg-[#161b22] p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-red-50 dark:bg-red-500/10 rounded-xl">
                <Lock size={22} className="text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-bold dark:text-white">Security & Password</h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showOldPass ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white outline-none focus:border-red-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPass(!showOldPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white outline-none focus:border-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 dark:bg-[#0d1117] dark:text-white outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              disabled={!oldPassword || !newPassword || newPassword !== confirmPassword}
              className={`mt-8 px-8 py-3 rounded-2xl font-bold transition-all active:scale-95 cursor-pointer ${newPassword && newPassword === confirmPassword
                ? "bg-slate-900 dark:bg-white dark:text-black text-white"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                }`}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;