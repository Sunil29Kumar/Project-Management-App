import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, Rocket, ShieldCheck } from 'lucide-react';
import { useProject } from '../hooks/useProject';
import { showToast } from '../utils/toast';

const InvitationResponse = () => {
    const { respondToInvitation, loading } = useProject();
    const [status, setStatus] = useState('pending'); // 'pending', 'success', 'failed'
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (decision) => {
        if (!token) {
            showToast.error("Invalid invitation link.");
            return;
        }

        // decision will be either 'accepted' or 'rejected'
        const data = await respondToInvitation(token, decision);
        console.log(data);
        

        if (data && data.success && data.projectId) {
            setStatus('success');
            setTimeout(() => {
                navigate(`/projects/${data.projectId}/board`);
            }, 3000);
        } else {
            setStatus('failed');
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8 text-center transition-all">

                {/* Icon Section */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl text-indigo-600 dark:text-indigo-400">
                        <Rocket size={40} className={status === 'pending' ? "animate-bounce" : ""} />
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Project Invitation
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                    You have been invited to collaborate on a project.
                    What would you like to do?
                </p>

                {status === 'pending' ? (
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => handleSubmit('accepted')}
                            disabled={loading}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
                            Accept Invitation
                        </button>

                        <button
                            onClick={() => handleSubmit('rejected')}
                            disabled={loading}
                            className="w-full py-4 bg-transparent border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                            <XCircle size={20} />
                            Decline
                        </button>
                    </div>
                ) : (
                    <div className={`p-4 rounded-xl flex items-center justify-center gap-3 font-bold ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {status === 'success' ? <ShieldCheck /> : <XCircle />}
                        {status === 'success' ? 'Invitation processed! Redirecting...' : 'Action failed. Please try again.'}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    DevSync Security Verified
                </div>
            </div>
        </div>
    );
};

export default InvitationResponse;