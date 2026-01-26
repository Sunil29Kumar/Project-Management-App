import { useState } from 'react';
import { Plus, Minus } from 'lucide-react'; // Icons use karein

const faqs = [
  {
    question: "Is DevSync free to use?",
    answer: "Yes! DevSync offers a Hobby plan that is free forever for individual developers. For teams requiring advanced features, we will soon launch our Pro plan."
  },
  {
    question: "How secure is my project data?",
    answer: "Security is our top priority. We use industry-standard DOMPurify sanitization and Zod validation on every request to ensure your data is safe from XSS and other vulnerabilities."
  },
  {
    question: "Can I collaborate with my team in real-time?",
    answer: "Absolutely! DevSync is built for collaboration. You can invite team members to your projects and see updates as they happen."
  },
  {
    question: "Does DevSync support partial updates?",
    answer: "Yes, our backend is optimized for partial updates. Only the fields you change are updated, making the app lightning-fast and efficient."
  },
  {
    question: "Is there a limit on how many projects I can create?",
    answer: "On the Hobby plan, you can create up to 3 projects. The Pro plan will offer unlimited projects and advanced analytics."
  }
];
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Got Questions?</h2>
          <p className="text-slate-500 text-lg">Everything you need to know about DevSync.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition"
              >
                <span className="font-bold text-slate-800 text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="text-blue-600 w-5 h-5" />
                ) : (
                  <Plus className="text-slate-400 w-5 h-5" />
                )}
              </button>
              
              {/* Answer with smooth transition */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;