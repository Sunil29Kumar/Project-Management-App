import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto bg-blue-600 rounded-[2.5rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-300">
        <h2 className="text-4xl font-bold mb-6">Ready to sync your first project?</h2>
        <p className="text-blue-100 mb-10 text-lg">Join 1000+ developers managing projects on DevSync.</p>
        <Link to={"/register"} className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition">
          Get DevSync for Free
        </Link>
      </div>
    </section>
  );
};

export default CTA;