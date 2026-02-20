import React from "react";

const NavbarSignInButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 border-2"
      style={{ borderColor: "white", color: "white", backgroundColor: "transparent" }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "var(--wander-dark-teal)";
        e.target.style.color = "white";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "transparent";
        e.target.style.color = "white";
      }}
    >
      Sign In
    </button>
  );
};

export default NavbarSignInButton;
