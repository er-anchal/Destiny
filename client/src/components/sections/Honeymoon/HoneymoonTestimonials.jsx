import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../../../data';

const HoneymoonTestimonials = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-center text-[#f68a95] text-5xl md:text-7xl mb-12 font-tangerine-custom text-shadow-custom">
          Hear from Travellers like you
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((item) => (
          <div key={item.id} className="bg-[#f8f9fa] p-6 rounded-xl flex gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="shrink-0 w-20 h-20 rounded-full overflow-hidden border-2 border-[#015f74]">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
               <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-800">{item.name}</p>
                  <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
               </div>
               <p className="text-gray-400 text-xs mb-2">{item.date}</p>
               <div className="relative pl-4 border-l-2 border-[#f68a95]">
                  <p className="text-gray-600 text-sm line-clamp-3 italic">"{item.text}"</p>
               </div>
               <button className="text-[#b46767] text-xs font-bold mt-2 hover:underline cursor-pointer">Continue Reading</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoneymoonTestimonials;