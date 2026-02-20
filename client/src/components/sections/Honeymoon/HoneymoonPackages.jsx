import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Clock, MapPin } from 'lucide-react';
import axios from 'axios';
import { honeymoonPackages, mapDbToData } from '../../../data';
import { Link } from 'react-router-dom'; 

// Import Swiper basic styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HoneymoonPackages = () => {
  const [dynamicPackages, setDynamicPackages] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/packages?category=honeymoon`);
        setDynamicPackages(mapDbToData(res.data));
      } catch (err) {
        console.error("Error fetching dynamic honeymoon packages:", err);
      }
    };
    fetchPackages();
  }, [API_URL]);

  // ✅ HYBRID LOGIC: Merge Database Data + Static Data
  const allPackages = [...dynamicPackages, ...honeymoonPackages];

  return (
    <section className="py-16 bg-[#fffaf0] overflow-hidden">
      {/* CRITICAL: These styles are specific to this component's Swiper instance.
         Kept here to ensure the component is self-contained and doesn't break if moved.
      */}
      <style>{`
        .honeymoon-swiper {
          padding-bottom: 50px !important;
          padding-left: 20px;
          padding-right: 20px;
        }
        
        .honeymoon-swiper .swiper-button-next,
        .honeymoon-swiper .swiper-button-prev {
          color: #f68a95 !important;
          background: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .honeymoon-swiper .swiper-button-next:after,
        .honeymoon-swiper .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }

        .honeymoon-swiper .swiper-pagination-bullet-active {
          background-color: #f68a95 !important;
        }
        .honeymoon-swiper .swiper-pagination-bullet {
          background-color: #ffd400;
          opacity: 0.6;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <h3 className="text-center text-[#f68a95] text-5xl md:text-7xl mb-10 font-tangerine-custom text-shadow-custom">
          All Honeymoon Packages
        </h3>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="honeymoon-swiper"
        >
          {allPackages.map((pkg, idx) => {
            // Safe ID fallback for routing
            const linkId = pkg.id || (pkg.title || "").toLowerCase().replace(/\s+/g, '-');

            return (
              <SwiperSlide key={pkg.id || idx}>
                {/* Linked Card Wrapper */}
                <Link to={`/package/${linkId}`} className="block h-full cursor-pointer">
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full border border-gray-100 group hover:shadow-2xl transition-shadow duration-300">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={pkg.img || pkg.image} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <span className="absolute top-4 right-4 bg-[#ffd400] text-black text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                        Customised
                      </span>
                    </div>
                    
                    {/* Content Container */}
                    <div className="p-6 flex flex-col flex-grow text-center">
                      <h4 className="font-bold text-lg text-gray-800 mb-4 h-[60px] flex items-center justify-center line-clamp-2">
                        {pkg.title}
                      </h4>
                      
                      <div className="flex justify-center gap-6 text-gray-500 text-sm mb-6">
                        <span className="flex items-center gap-2">
                          <Clock size={16} className="text-[#f68a95]"/> {pkg.days || pkg.duration || "5 Days"}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin size={16} className="text-[#f68a95]"/> {pkg.loc || pkg.location || "Multiple Locations"}
                        </span>
                      </div>
                      
                      <button className="mt-auto w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#e75480] to-[#ffb6c1] group-hover:from-[#ffb6c1] group-hover:to-[#e75480] transition-all shadow-md">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default HoneymoonPackages;