import React from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const MobileMenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button 
      className="lg:hidden text-white text-2xl cursor-pointer z-50" 
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {isOpen ? <FaTimes /> : <FaBars />}
    </button>
  );
};

export default MobileMenuToggle;
