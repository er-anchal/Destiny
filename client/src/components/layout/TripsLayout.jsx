import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroSection from '../sections/Trips/HeroSection';
import ExploreSection from '../sections/Trips/ExploreSection';
import Features from '../sections/Home/Features';
import FAQSection from '../sections/Trips/FAQ/FAQSection';
import TestimonialsSection from '../sections/Trips/TestimonialsSection';
import ContactSection from '../sections/Trips/Contact/ContactSection';
import { mapDbToData } from '../../data';

const TripsLayout = ({ 
  heroImage, 
  heroTitle, 
  heroSubtitle, 
  exploreTitle, 
  exploreData: staticData,
  category // Pass 'flipcard-india' or 'flipcard-intl' from parent
}) => {
  const [dynamicData, setDynamicData] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    if (category) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${API_URL}/api/packages?category=${category}`);
          setDynamicData(mapDbToData(data));
        } catch (err) {
          console.error("Error fetching trip layout data:", err);
        }
      };
      fetchData();
    }
  }, [category]);

  // ✅ FIX: Merge Database Data with Static Data (Instead of overwriting it)
  const activeData = [...dynamicData, ...(staticData || [])];

  return (
    <div className="bg-black min-h-screen font-sans">
      <HeroSection 
        backgroundImage={heroImage}
        title={heroTitle}
        subtitle={heroSubtitle}
      />
      
      <ExploreSection 
        title={exploreTitle} 
        destinationsData={activeData} 
      />
      
      <Features />
      <FAQSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default TripsLayout;