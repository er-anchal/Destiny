import React from 'react';
import { featuresData } from '../../../data';

const Features = () => {
    return (
        <section className="container mx-auto px-4 pt-8 mb-20">
            <div className="text-center mb-12">
                <p className="text-lg lg:text-2xl italic text-gray-500 font-[var(--font-cormorant)]">
                    Why Destiny?
                </p>
                <h2 className="text-3xl lg:text-5xl font-bold text-[var(--wander-teal)] mt-2">
                    Destiny’s Secret Sauce
                </h2>
                <div className="w-20 h-1 bg-[var(--wander-yellow)] mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuresData.map((card, idx) => (
                    <div 
                        key={idx} 
                        className="relative rounded-xl overflow-hidden aspect-[4/5] lg:aspect-[5/6] shadow-lg cursor-pointer group"
                    >
                        <img 
                            src={card.img} 
                            alt={card.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 flex flex-col justify-start pt-20 lg:pt-24 items-center p-4 lg:p-6 text-center">
                            <h3 className="text-[var(--wander-teal)] font-bold text-3xl lg:text-2xl mb-2 lg:mb-4">
                                {card.title}
                            </h3>
                            <p className="text-gray-800 text-l lg:text-base font-medium">
                                {card.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;