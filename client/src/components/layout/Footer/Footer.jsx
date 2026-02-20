import { useState } from "react";
import FooterLinks from "./FooterLinks";
import FooterAccordion from "./FooterAccordion";
import FooterBottom from "./FooterBottom";
import FooterCopyright from "./FooterCopyright";
import ContactModal from "../../common/ContactModal";

/**
 * Main footer component combining all footer sections
 */
const Footer = () => {
  const [openAccordions, setOpenAccordions] = useState([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); // Contact modal state

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleOpenContact = () => {
    setIsContactModalOpen(true);
  };

  return (
    <footer className="bg-black border-t-[10px] border-[rgb(1,95,116)] rounded-t-xl text-white mt-10">
      {/* Desktop Links */}
      <FooterLinks onContactClick={handleOpenContact} />

      {/* Mobile Accordion */}
      <FooterAccordion 
        openKeys={openAccordions} 
        toggleAccordion={toggleAccordion} 
        onContactClick={handleOpenContact}
      />

      {/* Footer Bottom (This handles the Social Icons natively) */}
      <FooterBottom />

      {/* Copyright */}
      <FooterCopyright />

      {/* Contact Modal rendered at Footer level */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;