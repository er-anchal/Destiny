import React from 'react';
import { FaTimes } from 'react-icons/fa';

const MobileMenuHeader = ({ onClose }) => {
  return (
    <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
      <h3 className="text-white font-semibold text-lg">Destiny</h3>
      <button 
        onClick={onClose}
        className="text-white text-2xl hover:bg-white/10 p-2 rounded-lg transition-colors duration-200"
        aria-label="Close menu"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export default MobileMenuHeader;
