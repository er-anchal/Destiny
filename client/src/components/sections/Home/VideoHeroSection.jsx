import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SliderNavButton from '../../common/SliderNavButton';
import TripCard from '../../common/Cards/TripCard/TripCard';
import {useNavigate} from 'react-router-dom';

const VideoHeroSection = ({ slides, title, subtitle, videoSrc, exploreLink }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative w-full h-[420px] md:h-[520px] lg:h-[560px] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <video src={videoSrc} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-between px-8 pt-8 pb-16 md:px-16 md:pt-16 md:pb-24">
          <div className="flex flex-col justify-start pt-2 md:pt-2">
            <h2 className="text-4xl md:text-5xl font-bold text-white italic font-[var(--font-cormorant)] mb-3 md:mb-4 max-w-lg leading-tight">{title}</h2>
            <p className="text-lg md:text-xl text-gray-100 max-w-md leading-relaxed">{subtitle}</p>
          </div>
          <div className="flex pb-12 md:pb-16">
            <button onClick={() => navigate(exploreLink)} className="bg-[var(--wander-yellow)] text-black font-bold px-8 md:px-10 py-3 md:py-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm md:text-base cursor-pointer">Explore</button>
          </div>
        </div>
      </div>

      <div className="-mt-32 relative z-10">
        <div className="px-6 md:px-16 lg:px-24">
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={10}
              slidesPerView={1}
              navigation={{ nextEl: '.swiper-next-hero', prevEl: '.swiper-prev-hero' }}
              pagination={{ clickable: true }}
              breakpoints={{
                500: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1000: { slidesPerView: 4, spaceBetween: 15 },
                1400: { slidesPerView: 5, spaceBetween: 20 },
              }}
              className="w-full relative pb-16 [&_.swiper-pagination-bullet]:!bg-white/40 [&_.swiper-pagination-bullet-active]:!bg-white [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:!static [&_.swiper-pagination]:!mt-8"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <TripCard slide={slide} variant="hero" />
                </SwiperSlide>
              ))}
            </Swiper>
            
            <SliderNavButton direction="prev" className="swiper-prev-hero" />
            <SliderNavButton direction="next" className="swiper-next-hero" />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoHeroSection;