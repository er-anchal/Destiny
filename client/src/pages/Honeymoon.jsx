import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Features from '../components/sections/Home/Features';
import { 
  honeymoonAssets, 
  honeymoonPackages as defaultPackages, 
  honeymoonDestinations as defaultDestinations,
  mapDbToData 
} from '../data';

import HoneymoonHero from '../components/sections/Honeymoon/HoneymoonHero';
import RomanticDestinations from '../components/sections/Honeymoon/RomanticDestinations';
import HoneymoonPackages from '../components/sections/Honeymoon/HoneymoonPackages';
import HoneymoonLeadForm from '../components/sections/Honeymoon/HoneymoonLeadForm';
import HoneymoonTestimonials from '../components/sections/Honeymoon/HoneymoonTestimonials';
import HoneymoonFAQ from '../components/sections/Honeymoon/HoneymoonFAQ';
import HoneymoonContact from '../components/sections/Honeymoon/HoneymoonContact';

const Honeymoon = () => {
  const [destinations, setDestinations] = useState(defaultDestinations);
  const [packages, setPackages] = useState(defaultPackages);

  useEffect(() => {
    const fetchHoneymoonData = async () => {
      try {
        const [destRes, pkgRes] = await Promise.all([
          axios.get('http://localhost:5001/api/packages?category=honeymoon-dest'),
          axios.get('http://localhost:5001/api/packages?category=honeymoon')
        ]);
        
        // Merge Static + Dynamic
        setDestinations([...defaultDestinations, ...mapDbToData(destRes.data)]); 
        setPackages([...defaultPackages, ...mapDbToData(pkgRes.data)]);
      } catch (err) {
        console.error("Error loading honeymoon data:", err);
      }
    };
    fetchHoneymoonData();
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lugrasimo&family=Tangerine:wght@400;700&display=swap');
        .font-tangerine-custom { font-family: "Tangerine", cursive; }
        .text-shadow-custom { text-shadow: 3px 0 2px black; }
        .text-shadow-light { text-shadow: 3px 0 2px rgb(134, 167, 182); }
      `}</style>

      <main>
        <HoneymoonHero />
        <RomanticDestinations destinationsData={destinations} />
        <section className="w-full pb-10">
           <img src={honeymoonAssets.banner} alt="Banner" className="w-full h-auto" />
        </section>
        <HoneymoonPackages packagesData={packages} />
        <HoneymoonLeadForm />
        <HoneymoonTestimonials />
        <HoneymoonFAQ />
        <div className="py-10"><Features /></div>
        <HoneymoonContact />
      </main>
    </div>
  );
};

export default Honeymoon;