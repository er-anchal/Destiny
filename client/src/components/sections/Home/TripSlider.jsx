import React from 'react';
import VideoHeroSection from './VideoHeroSection';
import StandardSection from './StandardSection';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TripSlider = ({ slides, title, subtitle, videoSrc, exploreLink }) => {
  return ( 
    <section className="container mx-auto px-4 my-25 relative ">
      {videoSrc ? (
        <VideoHeroSection 
          slides={slides} 
          title={title} 
          subtitle={subtitle} 
          videoSrc={videoSrc} 
          exploreLink={exploreLink}
        />
      ) : (
        <StandardSection 
          slides={slides} 
          title={title} 
          subtitle={subtitle} 
        />
      )}
    </section>
  );
};

export default TripSlider;