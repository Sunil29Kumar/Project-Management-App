import { Check, IndianRupee } from 'lucide-react'; // Icons ke liye

const pricingPlans = [
  {
    name: "Basic",
    price: "0",
    description: "Perfect for individual developers and side projects.",
    features: ["Up to 3 Projects", "Basic Task Management", "2 Team Members", "Community Support"],
    buttonText: "Get Started",
    isPopular: false,
  },
  {
    name: "Pro",
    price: "9999",
    description: "For scaling teams that need advanced tools and sync.",
    features: ["Unlimited Projects", "Advanced Analytics", "Unlimited Team Members", "Priority Support", "Custom Tags & Status"],
    buttonText: "Start Free Trial",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Dedicated support and infrastructure for large orgs.",
    features: ["Self-hosting options", "SLA Guarantee", "Dedicated Account Manager", "SSO & Advanced Security"],
    buttonText: "Contact Sales",
    isPopular: false,
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Plans that scale with you</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Whether you're a solo dev or a fast-growing team, DevSync has a plan to help you stay in sync.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-3xl border ${
                plan.isPopular 
                ? 'border-blue-600 shadow-xl shadow-blue-100 ring-1 ring-blue-600' 
                : 'border-slate-200'
              } transition-all hover:-translate-y-2`}
            >
              {plan.isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <div className="text-4xl flex justify-center items-center font-extrabold"><IndianRupee />{plan.price}</div>
                {plan.price !== "Custom" && <span className="text-slate-500">/mo</span>}
              </div>
              <p className="text-slate-500 text-sm mb-8">{plan.description}</p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <Check className="w-5 h-5 text-blue-600 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-bold transition ${
                plan.isPopular 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
              }`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;