import React from 'react';
import { ReactTyped } from 'react-typed';
// Make sure this path is correct based on where you put your video
import headerVideo from '../../../assets/videos/home.mp4'; 

const Hero = () => {
  return (
    <header className="relative w-full h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src={headerVideo} type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-4">
        <h1 className="text-white font-bold italic text-4xl md:text-6xl mb-4 font-[var(--font-montserrat)]">
          Global Community for Travelers
        </h1>
        <div className="text-[var(--wander-yellow)] text-3xl md:text-5xl font-bold h-[60px]">
          <ReactTyped
            strings={[
              "Creating Stories",
              "Fulfilling Adventure",
              "Spreading Happiness",
              "Connecting Peoples",
              "Creating Memories",
              "Exploring the World"
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </div>
      </div>
    </header>
  );
};

export default Hero;