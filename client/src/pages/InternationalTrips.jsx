import React from 'react';
import TripsLayout from '../components/layout/TripsLayout';
import { InternationalDestinations } from '../data';
import internationalHero from '../assets/banner/international.webp';

const InternationalTrips = () => {
  return (
    <TripsLayout
      heroImage={internationalHero}
      heroTitle="Book International Holiday Packages"
      heroSubtitle="International Holiday Packages Crafted For Every Dream, Every Destination"
      exploreTitle="Explore International"
      exploreData={InternationalDestinations}
      category="flipcard-intl" // ✅ Passes exact category to fetch from Admin
    />
  );
};

export default InternationalTrips;