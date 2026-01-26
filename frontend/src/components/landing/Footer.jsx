import { Link } from "react-router-dom";
import { Link as  ScrollLink } from "react-scroll";

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="text-2xl font-bold text-blue-600 mb-4">DevSync</div>
          <p className="text-slate-500 text-sm">Building the future of developer collaboration, one project at a time.</p>
        </div>
        <div>
          <h5 className="font-bold mb-4">Product</h5>
          <ul className="text-slate-500 space-y-2 text-sm">
            <li><ScrollLink to="features" smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Features</ScrollLink></li>
            <li><ScrollLink to="pricing" smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">Pricing</ScrollLink></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-4">Company</h5>
          <ul className="text-slate-500 space-y-2 text-sm">
            <li><ScrollLink to="about" smooth={true} duration={500} className="hover:text-blue-600 cursor-pointer">About Us</ScrollLink></li>
            <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-blue-600">Terms</Link></li>
          </ul>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;