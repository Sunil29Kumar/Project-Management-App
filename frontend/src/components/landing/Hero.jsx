import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="about" className="relative pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <span className="inline-block py-1 px-3 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-50 rounded-full">
          New: Real-time Task Sync is here
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
          Manage Projects Without <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            The Coordination Chaos
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-10">
          DevSync brings your team's code and tasks together. Built by developers, for developers who value speed and clean workflows.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={"/register"} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300">
            Start Your First Project
          </Link>
          <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition">
            Watch Product Demo
          </button>
        </div>
        
        {/* Mockup Image Placeholder */}
        <div className="mt-16 relative max-w-5xl mx-auto border-8 border-slate-100 rounded-3xl shadow-2xl">
           <div className="bg-slate-200 aspect-video rounded-2xl flex items-center justify-center text-slate-400">
              [Application Dashboard Screenshot]
           </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;