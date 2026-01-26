import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

const LoginForm = () => {
    // AuthContext se login function nikalna
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isOpenEye, setIsOpenEye] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setFieldErrors({}); 
        setIsLoading(true);

        const res = await login(email, password);
        
        setIsLoading(false);

        if (res?.success) {
            toast.success("Login successful! Welcome back.");
            navigate("/dashboard"); 
        } else {
           
            if (res?.error) {
               
                if (typeof res.error === 'object') setFieldErrors(res.error); 
                else if (typeof res.error === 'string') setFieldErrors(res.error)
                else {
                    toast.error(res.error);
                }
            } else {
                toast.error("Something went wrong. Please try again.");
            }
           console.log(fieldErrors);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
                    <p className="text-slate-500 mt-2">Log in to your DevSync account.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="sk@example.com"
                            className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.email ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none transition`}
                        />
                        {fieldErrors.email && <p className="text-red-500 text-sm mt-1">{fieldErrors.email[0]}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={isOpenEye ? "text" : "password"}
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.password ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-blue-500 outline-none transition pr-12`}
                            />
                            <button
                                type="button"
                                onClick={() => setIsOpenEye(!isOpenEye)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition"
                            >
                                {isOpenEye ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                        {fieldErrors.password && <p className="text-red-500 text-sm mt-1">{fieldErrors.password[0] }</p>}
                        {fieldErrors.length > 0 && <p className="text-red-500 text-sm mt-1">{fieldErrors }</p>}
                    </div>
                    <div className="text-right">
                        <Link to="/forgot-password" size="sm" className="text-sm text-blue-600 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition duration-300 shadow-lg shadow-blue-200 disabled:bg-blue-400"
                    >
                        {isLoading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <p className="text-center mt-6 text-slate-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-bold hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;