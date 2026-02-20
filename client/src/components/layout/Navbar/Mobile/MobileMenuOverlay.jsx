import React from 'react';

const MobileMenuOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="inset-0 lg:hidden z-30 transition-opacity duration-300"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)'
      }}
      onClick={onClose}
      role="presentation"
    />
  );
};

export default MobileMenuOverlay;
