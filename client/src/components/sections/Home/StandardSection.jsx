import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import SliderNavButton from '../../common/SliderNavButton';
import TripCard from '../../common/Cards/TripCard/TripCard';

const StandardSection = ({ slides, title, subtitle }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold text-[var(--wander-teal)] italic font-[var(--font-cormorant)] mb-4">{title}</h2>
        {subtitle && <p className="text-lg text-gray-600 mb-6">{subtitle}</p>}
        <div className="w-24 h-1 bg-[var(--wander-yellow)] mx-auto"></div>
      </div>

      {/* Reduced padding (px-2) so buttons on the border align closer to the screen edge if needed, 
          or keep px-8 if you want them inside the container */}
      <div className="relative px-2 md:px-8">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          navigation={{ nextEl: '.swiper-next-deals', prevEl: '.swiper-prev-deals' }}
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
              <TripCard slide={slide} variant="deal" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Added position="on-border" prop */}
        <SliderNavButton direction="prev" className="swiper-prev-deals" position="on-border" />
        <SliderNavButton direction="next" className="swiper-next-deals" position="on-border" />
      </div>
    </div>
  );
};

export default StandardSection;