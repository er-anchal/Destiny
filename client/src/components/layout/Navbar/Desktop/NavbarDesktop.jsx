import React from "react";
import NavLogo from "../Common/NavLogo";
import NavMenuItems from "./NavMenuItems";
import NavbarSignInButton from "./NavbarSignInButton";
import UserProfileDropdown from "../Common/UserProfileDropdown";
import { useAuth } from "../../../../context/AuthContext";
import { navLinks } from "../../../../data";

// 👇 Update: Destructure 'onSignIn' from props
const NavbarDesktop = ({ isScrolled, isHome, onSignIn }) => {
  const { user } = useAuth();

  return (
    <div className="hidden lg:flex items-center justify-between w-full h-full">
      {/* Logo Section */}
      <div className="flex-shrink-0">
        <NavLogo />
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex justify-center">
        <NavMenuItems items={navLinks} />
      </div>

      {/* Right Actions: Profile OR Sign In */}
      <div className="flex-shrink-0 flex items-center gap-4">
        {user ? (
          <UserProfileDropdown />
        ) : (
          /* 👇 Fix: Pass 'onSignIn' as the 'onClick' prop */
          <NavbarSignInButton onClick={onSignIn} />
        )}
      </div>
    </div>
  );
};

export default NavbarDesktop;