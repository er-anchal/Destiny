import React, { useState } from 'react';
import { assets } from '../../../data';
import ContactModal from '../../common/ContactModal';

const ContactBanner = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="container mx-auto px-4 mb-20 relative">
                <div className="rounded-2xl overflow-hidden relative h-[300px]">
                    <img src={assets.connectBanner} alt="Connect" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-10 md:px-20">
                        <h2 className="text-white text-3xl md:text-4xl font-bold italic mb-2 font-[var(--font-cormorant)]">
                            Dreaming of your next Adventure?
                        </h2>
                        <p className="text-white text-xl mb-6">Hit us up!</p>
                        
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[var(--wander-yellow)] hover:bg-[var(--wander-yellow-hover)] text-black font-bold py-3 px-8 rounded-full transition-colors cursor-pointer shadow-lg transform active:scale-95 duration-200"
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </section>

            {/* Modal Component */}
            <ContactModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </>
    );
};

export default ContactBanner;