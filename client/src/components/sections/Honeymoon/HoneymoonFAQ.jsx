import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { honeymoonFaqs, honeymoonAssets } from '../../../data';

const HoneymoonFAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section className="py-16 bg-[#fffaf0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
            <p className="text-xl font-bold mb-2" style={{ fontFamily: 'Lugrasimo, cursive' }}>You have the Right to Know!</p>
            <h2 className="text-[#f68a95] text-5xl md:text-7xl font-tangerine-custom text-shadow-custom">
              Frequently Asked Questions
            </h2>
        </div>
        
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 justify-center">
           <div className="w-full md:w-1/2 flex justify-center">
             <img src={honeymoonAssets.faq} alt="FAQ Illustration" className="w-full max-w-md h-auto object-contain" />
           </div>

           <div className="w-full md:w-1/2 space-y-4">
             {honeymoonFaqs.map((faq, idx) => (
               <div key={idx} className="border border-[#f68a95]/50 rounded-lg overflow-hidden bg-white">
                 <button 
                   onClick={() => toggleAccordion(idx)} 
                   className="w-full flex justify-between items-center p-4 text-left font-bold text-[#b46767] hover:bg-pink-50 transition-colors cursor-pointer"
                 >
                   <span className="w-[90%]">Q: {faq.q}</span>
                   {activeAccordion === idx ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                 </button>
                 {activeAccordion === idx && (
                     <div className="p-4 text-gray-600 text-sm border-t border-pink-100 leading-relaxed">
                         A: {faq.a}
                     </div>
                 )}
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default HoneymoonFAQ;