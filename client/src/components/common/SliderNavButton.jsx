import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SliderNavButton = ({ direction, className, position = 'outside' }) => {
  const isNext = direction === 'next';
  const Icon = isNext ? FaChevronRight : FaChevronLeft;

  // Define positioning logic
  let positionClasses = '';
  
  if (position === 'outside') {
    positionClasses = isNext ? '-right-6 md:-right-10' : '-left-6 md:-left-10';
  } else if (position === 'on-border') {
    positionClasses = isNext ? 'right-2 md:right-4' : 'left-2 md:left-4';
  }

  return (
    <div 
      className={`${className} absolute top-[40%] -translate-y-1/2 z-50 cursor-pointer group ${positionClasses}`}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/45 group-hover:bg-black/65 border border-white/30 flex items-center justify-center transition-all duration-300 shadow-xl backdrop-blur-sm">
        <Icon className="text-white text-lg md:text-xl" />
      </div>
    </div>
  );
};

export default SliderNavButton;