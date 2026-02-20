import React from 'react';
import { assets } from '../../../data';

const Banner = () => {
    return (
        <section className="container mx-auto px-4 mb-16 hidden md:block">
            <div className="w-full rounded-2xl overflow-hidden shadow-md">
                <img 
                    src={assets.upcomingBanner} 
                    alt="Upcoming Trips" 
                    className="w-full h-auto object-cover" 
                />
            </div>
        </section>
    );
};

export default Banner;