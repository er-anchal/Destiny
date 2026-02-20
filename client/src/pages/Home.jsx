import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/sections/Home/Hero';
import TripSlider from '../components/sections/Home/TripSlider';
import Features from '../components/sections/Home/Features';
import ContactBanner from '../components/sections/Home/ContactBanner';
import Banner from '../components/sections/Home/Banner';

// Import Data and Helper
import { 
    dealsData, 
    internationalData, 
    indiaData, 
    romanticData,
    mapDbToData 
} from '../data';

// Video Imports
import intVideo from '../assets/videos/international.mp4';
import indiaVideo from '../assets/videos/india.mp4';
import romanticVideo from '../assets/videos/romantic.mp4';

const Home = () => {
    const [deals, setDeals] = useState([]);
    const [intl, setIntl] = useState([]);
    const [india, setIndia] = useState([]);
    const [romantic, setRomantic] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const [dRes, iRes, nRes, rRes] = await Promise.all([
                    axios.get(`${API_URL}/api/packages?category=deal`),
                    axios.get(`${API_URL}/api/packages?category=international`),
                    axios.get(`${API_URL}/api/packages?category=india`),
                    axios.get(`${API_URL}/api/packages?category=honeymoon`)
                ]);
                setDeals(mapDbToData(dRes.data));
                setIntl(mapDbToData(iRes.data));
                setIndia(mapDbToData(nRes.data));
                setRomantic(mapDbToData(rRes.data));
            } catch (err) {
                console.error("Error fetching home data:", err);
            }
        };
        fetchHomeData();
    }, []);

    // ✅ FIXED: MERGE Database Data + Static Data
    // This ensures both Cloudinary images AND your local images show up together.
    const getSlides = (dbData, staticData) => {
        const combined = [...(dbData || []), ...staticData];
        // Remove duplicates if any (optional safety check based on ID)
        return combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
    };

    return (
        <div className="bg-black font-var[(--font-montserrat)] text-gray-900">
            <Hero />

            <main>
                {/* 1. Deals Section */}
                <div>
                    <TripSlider 
                        title="Exhilarating Deals" 
                        slides={getSlides(deals, dealsData)} 
                        isDealSlider={true} 
                    />
                </div>

                {/* 2. Banner Image */}
                <Banner />

                {/* 3. International Trips (Video Background) */}
                <TripSlider 
                    title="International Trips" 
                    subtitle="Discover the world, one destination at a time"
                    videoSrc={intVideo} 
                    slides={getSlides(intl, internationalData)}
                    exploreLink="/international"
                />

                {/* 4. Explore India (Video Background) */}
                <TripSlider 
                    title="Explore India" 
                    subtitle="A Journey through Time, Colour and Culture"
                    videoSrc={indiaVideo} 
                    slides={getSlides(india, indiaData)}
                    exploreLink="/india"
                />

                {/* 5. Romantic Escapes (Video Background) */}
                <TripSlider 
                    title="Romantic Escapes" 
                    subtitle="Where Forever Begins.... Together!"
                    videoSrc={romanticVideo} 
                    slides={getSlides(romantic, romanticData)}
                    exploreLink="/honeymoon"
                />

                {/* 6. Features Grid */}
                <Features />

                {/* 7. Contact Banner */}
                <ContactBanner />
            </main>
        </div>
    );
};

export default Home;