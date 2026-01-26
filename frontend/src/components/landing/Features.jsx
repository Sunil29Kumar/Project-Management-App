const Features = () => {
  const list = [
    { title: "Safe & Secure", desc: "Built-in DOMPurify sanitization protects your data.", icon: "🛡️" },
    { title: "Rapid Updates", desc: "Optimized partial updates for lightning-fast edits.", icon: "⚡" },
    { title: "Team Collaboration", desc: "Sync tasks across your entire development team.", icon: "👥" },
    { title: "Clean Dashboard", desc: "No clutter. Just your projects and your progress.", icon: "📊" }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">Everything you need to deliver.</h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-200 transition">
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;