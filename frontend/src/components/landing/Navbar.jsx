import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          <span>{/* Icon yahan dalen */}</span> DevSync
        </div>
        <div className="hidden md:flex gap-8 text-slate-600 font-medium">
          <ScrollLink to="features" smooth={true} duration={500} className="hover:text-blue-600 transition cursor-pointer">Features</ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500} className="hover:text-blue-600 transition cursor-pointer">About</ScrollLink>
          <ScrollLink to="faq" smooth={true} duration={500} className="hover:text-blue-600 transition cursor-pointer">FAQ</ScrollLink>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-lg shadow-blue-200">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;