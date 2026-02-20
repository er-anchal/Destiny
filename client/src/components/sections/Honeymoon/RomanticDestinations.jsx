import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { honeymoonDestinations, mapDbToData } from '../../../data';

const RomanticDestinations = () => {
  const [dynamicDestinations, setDynamicDestinations] = useState([]);

  useEffect(() => {
    const fetchHoneymoonDestinations = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/packages?category=honeymoon');
        setDynamicDestinations(mapDbToData(res.data));
      } catch (err) {
        console.error("Error fetching Romantic destinations:", err);
      }
    };

    fetchHoneymoonDestinations();
  }, []);

  // Merge Database Packages with Static Honeymoon Destinations
  const mergedDestinations = [...dynamicDestinations, ...honeymoonDestinations];

  return (
    <section className="py-16 bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="container mx-auto px-4 text-center">
        {/* Restored exact Title, Font Size (5xl/7xl), and Color */}
        <h2 className="text-[#f68a95] text-5xl md:text-7xl mb-12 font-tangerine-custom text-shadow-custom">
          Your Love Story Our Destinations...
        </h2>
        
        {/* Restored Grid Layout (max-w-6xl, gap-8) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {mergedDestinations.map((item, idx) => {
            // Safe ID generation for the link
            const linkId = item.id || (item.alt || "").toLowerCase().replace(/\s+/g, '-');

            return (
              <Link 
                to={`/package/${linkId}`}
                key={idx} 
                className="group relative aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white cursor-pointer hover:scale-105 transition-all duration-300 block"
              >
                <img 
                  // ✅ FIX: Allow it to read `image` (from DB) or `img` (from Static)
                  src={item.image || item.img || item.front} 
                  alt={item.alt || item.title} 
                  className="w-full h-full object-cover" 
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RomanticDestinations;