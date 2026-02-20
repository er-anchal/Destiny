import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 Import useLocation
import NavbarDesktop from './Desktop/NavbarDesktop';
import MobileMenu from './Mobile/MobileMenu';
import MobileMenuToggle from './Mobile/MobileMenuToggle';
import NavLogo from './Common/NavLogo';
import NavbarShell from './Common/NavbarShell';
import useNavbarScroll from './hooks/useNavbarScroll';
import useBodyScrollLock from './hooks/useBodyScrollLock';
import { navLinks } from "../../../data";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get current location

  const scrolled = useNavbarScroll(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if we are on the home page
  const isHome = location.pathname === '/';

  useBodyScrollLock(mobileMenuOpen);

  const handleSignIn = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <NavbarShell scrolled={scrolled} hidden={mobileMenuOpen}>
        <div className="lg:hidden">
          <NavLogo />
        </div>

        <NavbarDesktop
          // 👇 PASS THEM HERE
          isScrolled={scrolled}
          isHome={isHome}
          onSignIn={handleSignIn}
        />

        <MobileMenuToggle
          isOpen={mobileMenuOpen}
          onToggle={() => setMobileMenuOpen((prev) => !prev)}
        />
      </NavbarShell>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuItems={navLinks}
        onItemClick={() => setMobileMenuOpen(false)}
        onSignInClick={handleSignIn}
      />
    </>
  );
};

export default Navbar;