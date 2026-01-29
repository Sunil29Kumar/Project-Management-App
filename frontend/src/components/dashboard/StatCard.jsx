import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon, colorClass, trend }) => {
  return (
    <div className="group bg-white px-3 py-2 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 relative overflow-hidden">
      
      {/* Decorative Background Blur */}
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 blur-2xl ${colorClass}`}></div>

      <div className="flex items-start justify-between">
        <div className="space-y-4">
          {/* Icon Container */}
          <div className={`p-3 rounded-xl w-fit shadow-sm ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          
          <div>
            <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
              {trend && (
                <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                  <TrendingUp size={12} className="mr-1" />
                  {trend}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom progress-like bar for visual flair */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-50 overflow-hidden">
         <div className={`h-full w-1/3 opacity-40 ${colorClass}`}></div>
      </div>
    </div>
  );
};

export default StatCard;