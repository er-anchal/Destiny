import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { aboutPageData } from '../data';

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  // Destructure data including socialIcons
  const { hero, team, warriors, brands, socialIcons } = aboutPageData;
  const { Linkedin, Instagram } = socialIcons;

  // Reusable Card for Team & Warriors
  const TeamCard = ({ img, name, role, desc, isSocial = true, isWarrior = false }) => (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col items-center justify-center text-center mb-6 px-3">
      <img
        src={img}
        alt={role}
        className={`object-cover mb-4 rounded-full shadow-[4px_3px_14px_1px_rgba(0,0,0,0.62)] ${
            isWarrior 
            ? "bg-gray-100 w-[150px] h-[150px] p-2" 
            : "w-[150px] h-[150px]"
        }`}
      />
      
      {name && (
        <h3 className="font-['Tangerine',_cursive] font-bold text-[3rem] sm:text-[2.5rem] lg:text-[2.5rem] leading-none mb-1">
            {name}
        </h3>
      )}
      
      <h4 className="font-['Lugrasimo',_cursive] text-base lg:text-lg mb-2">
        {role}
      </h4>

      {/* Social Icons - NOW USING ICONS */}
      {isSocial && (
        <div className="flex justify-center gap-3 mb-2">
            {/* Wrapper simulates the look of the previous images: white square with shadow */}
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-white shadow-[4px_3px_14px_1px_rgba(0,0,0,0.62)] p-1 hover:scale-110 transition-transform cursor-pointer">
                <Linkedin className="w-5 h-5 text-black" strokeWidth={1.5} />
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center rounded-[10px] bg-white shadow-[4px_3px_14px_1px_rgba(0,0,0,0.62)] p-1 hover:scale-110 transition-transform cursor-pointer">
                <Instagram className="w-5 h-5 text-black" strokeWidth={1.5} />
            </a>
        </div>
      )}

      <div className="bg-[#E4E422] w-[20%] sm:w-[35%] lg:w-[20%] h-[2px] mb-3 mt-2"></div>

      <p className="text-sm lg:text-base leading-relaxed px-2">
        {desc}
      </p>
    </div>
  );

  return (
    <div className="bg-[#4493a5] text-white overflow-x-hidden font-sans">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Lugrasimo&family=Tangerine:wght@400;700&display=swap');`}
      </style>

      
      {/* ================= HERO SECTION ================= */}
      <div className="relative w-full h-screen">
        <img
          className="w-full h-full object-cover"
          src={hero.bg}
          alt="About Background"
        />
        <div className="absolute inset-0 bg-black/40 z-10 overflow-hidden flex items-center justify-center">
            <div data-aos="zoom-in-up" data-aos-delay="400" className="relative z-20 mt-20">
              <img
                className="w-auto max-h-[400px] lg:max-h-[600px] sm:w-[600px] object-contain"
                src={hero.center}
                alt="About Center"
              />
            </div>
        </div>
      </div>

      {/* ================= TEAM SECTION ================= */}
      <section className="container mx-auto pt-[100px] pb-8 px-4">
        <div className="flex justify-center mb-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-['Lugrasimo',_cursive]">Meet Our Team. The ideal set of extraordinary people</h2>
        </div>
        
        <div className="grid grid-cols-12 gap-6">
            {team.map((member, idx) => (
                <TeamCard 
                    key={idx}
                    img={member.img} 
                    name={member.name} 
                    role={member.role} 
                    desc={member.desc}
                    isSocial={member.social}
                />
            ))}
        </div>
      </section>

      {/* ================= WARRIORS SECTION ================= */}
      <section className="container mx-auto pt-3 px-4">
        <div className="flex justify-center mb-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-['Lugrasimo',_cursive]">Our WARRIORS who have helped us build this holistic community</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
            {warriors.map((warrior, idx) => (
                <TeamCard 
                    key={idx}
                    img={warrior.img}
                    role={warrior.role}
                    desc={warrior.desc}
                    isSocial={false}
                    isWarrior={true}
                />
            ))}
        </div>
      </section>

      {/* ================= BRANDS SECTION ================= */}
      <section className="container mx-auto pt-3 pb-[50px] px-4">
        <div className="flex justify-center mb-6 text-center">
            <h2 className="text-2xl lg:text-3xl font-['Lugrasimo',_cursive]">BRANDS who trust us</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8 items-center">
            {brands.map((brand, idx) => (
                <div key={idx} className="w-[120px] md:w-[150px] flex flex-col items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                    <img src={brand.img} alt={brand.name} className="w-full h-auto object-contain" />
                </div>
            ))}
        </div>
      </section>


    </div>
  );
};

export default About;