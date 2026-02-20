import React from 'react';
import { honeymoonAssets } from '../../../data';

const HoneymoonHero = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-screen">
      <img 
        src={honeymoonAssets.cover} 
        alt="Honeymoon Cover" 
        className="w-full h-full object-cover" 
      />
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4 pt-20">
        <h1 className="text-white font-bold text-6xl md:text-8xl mb-6 font-tangerine-custom text-shadow-custom">
          Honeymoon Tour Packages
        </h1>
        <p className="text-white text-xl md:text-3xl mb-10 italic" style={{ fontFamily: 'Lugrasimo, cursive' }}>
          Where Forever Begins Together...
        </p>
        <button className="bg-[#ffd400] hover:bg-[#d4b200] text-black font-bold py-3 px-10 rounded-full transition-transform hover:scale-105 shadow-xl cursor-pointer">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HoneymoonHero;