import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useState } from "react";
// Icons import karein
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { showToast } from "../../utils/toast.js";
import { toast } from "sonner";

const RegisterForm = () => {
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isOpenEye, setIsOpenEye] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        setFieldErrors({}); // Clear old errors
        const res = await register(name, email, password);
        console.log(res);
        
        if (res?.success) {
            toast.success("Registration successful! You can now log in.");
            navigate("/login");
        } else {
            if (res?.error) {
                setFieldErrors(res.error);
                showToast.error("Registration failed. Please try again.");
            } 
        }

    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Join DevSync</h2>
                    <p className="text-slate-500 mt-2">Start managing your projects like a pro.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Sunil Kumar"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                        {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name[0]}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="sk@example.com"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                        {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email[0]}</p>}
                    </div>

                    {/* Password Field with Eye Toggle */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                // Dynamic type: password ya text
                                type={isOpenEye ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition pr-12"
                            />
                            {/* Eye Icon Button */}
                            <button
                                type="button" // Important: Isse form submit nahi hoga
                                onClick={() => setIsOpenEye(!isOpenEye)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
                            >
                                {isOpenEye ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-200"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-bold hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;