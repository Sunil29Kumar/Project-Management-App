import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import CTA from '../../components/landing/CTA';
import Navbar from '../../components/landing/Navbar';
import Footer from '../../components/landing/Footer';
import FAQ from '../../components/landing/FAQ';
import Pricing from '../../components/landing/Pricing';

const LandingPage = () => {
  return (
    <div className="selection:bg-blue-100 selection:text-blue-600">
      <Navbar />
      <Hero />
      <Features />
      <FAQ/>
      <Pricing/>
      <CTA />
      <Footer/>
      <footer className="py-2 text-center text-slate-400 text-sm ">
        © 2026 DevSync.
      </footer>
    </div>
  );
};

export default LandingPage;
