import React from "react";

const NavbarShell = ({ scrolled, hidden, children }) => {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "py-3 shadow-lg" : "py-4"
      } ${hidden ? "invisible opacity-0" : "visible opacity-100"}`}
      style={{
        backgroundColor: scrolled ? "var(--wander-dark-teal)" : "transparent",
      }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {children}
      </div>
    </nav>
  );
};

export default NavbarShell;
