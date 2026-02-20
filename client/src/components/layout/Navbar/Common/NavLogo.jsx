import React from 'react';

const NavLogo = () => {
  return (
    <a href="/" className="flex items-center">
      <img 
        src="/logo.png" 
        alt="Destiny Logo" 
        className="w-16.5 h-auto object-contain" 
      />
    </a>
  );
};

export default NavLogo;
