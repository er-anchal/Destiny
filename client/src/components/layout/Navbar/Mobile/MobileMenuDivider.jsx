import React from 'react';

const MobileMenuDivider = ({ isOpen }) => {
  return (
    <div 
      className={`border-t border-white/20 mx-6 transform transition-all duration-300 ${
        isOpen 
          ? 'opacity-100 scale-x-100' 
          : 'opacity-0 scale-x-0'
      }`}
      style={{ transitionDelay: isOpen ? '400ms' : '0ms', transformOrigin: 'left' }}
    />
  );
};

export default MobileMenuDivider;
