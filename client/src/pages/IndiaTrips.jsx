import React from 'react';
import TripsLayout from '../components/layout/TripsLayout';
import { IndianDestinations } from '../data'; 
import indiaHero from '../assets/banner/india-wallpaper.webp';

const IndiaTrips = () => {
  return (
    <TripsLayout
      heroImage={indiaHero}
      heroTitle="Book India Holiday Packages"
      heroSubtitle="India Holiday Packages Crafted For Every Dream, Every Destination"
      exploreTitle="Explore India"
      exploreData={IndianDestinations}
      category="flipcard-india" // ✅ Passes exact category to fetch from Admin
    />
  );
};

export default IndiaTrips;