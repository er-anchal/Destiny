import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

const FloatingContactButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Optional: Show button only after scrolling down a bit (or always show)
  useEffect(() => {
    // Small delay to show button smoothly after page load
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[90] flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--wander-yellow)] text-[var(--wander-teal)] shadow-lg shadow-black/30 cursor-pointer group"
          >
            {/* The Icon */}
            <MessageCircle size={24} strokeWidth={2.5} className="relative z-10" />

            {/* Continuous Pulse Animation Ring */}
            <span className="absolute inset-0 rounded-full bg-[var(--wander-yellow)] opacity-50 animate-ping z-0"></span>

            {/* Tooltip (Visible on Hover) */}
            <span className="absolute right-full mr-4 bg-white text-[var(--wander-teal)] px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl whitespace-nowrap pointer-events-none transform translate-x-2 group-hover:translate-x-0">
              Plan your Trip!
              {/* Little arrow for tooltip */}
              <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* The Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default FloatingContactButton;