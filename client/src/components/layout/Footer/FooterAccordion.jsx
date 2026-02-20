import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../../data';

const FooterAccordion = ({ onContactClick }) => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (title) => {
    setOpenSection(openSection === title ? null : title);
  };

  const getLinkPath = (category, item) => {
    const cleanItem = item.trim();
    const cleanCat = category.toLowerCase();

    if (cleanItem === "Spiti Valley") return "/package/india-spiti";
    if (cleanItem === "Home") return "/";
    if (cleanItem === "About Us") return "/about";
    
    if (cleanItem === "India Trips" || cleanItem === "Community Trips" || cleanItem === "Weekend Gateways") return "/india";
    if (cleanItem === "International Trips") return "/international";
    if (cleanItem === "Honeymoon Packages" || cleanItem === "Honeymoon Trips" || cleanItem === "Romantic Explorer") return "/honeymoon";
    if (cleanItem === "Blogs" || cleanItem === "Privacy Policy") return "#";

    if (cleanCat.includes("romantic") || cleanCat.includes("special") || cleanCat.includes("honeymoon")) {
        const romanticMap = {
            "bali": "honey-bali",
            "vietnam": "honey-vietnam",
            "maldives": "honey-maldives",
            "singapore": "honey-singapore",
            "thailand": "honey-thailand",
            "kashmir": "honey-kashmir-couple",
            "kerala": "honey-kerala",
            "andaman": "honey-andaman"
        };
        const key = cleanItem.toLowerCase();
        return romanticMap[key] ? `/package/${romanticMap[key]}` : "/honeymoon";
    }

    if (cleanCat.includes("international")) return `/package/intl-${cleanItem.toLowerCase().replace(/\s+/g, '-')}`;
    if (cleanCat.includes("india")) return `/package/india-${cleanItem.toLowerCase().replace(/\s+/g, '-')}`;

    return "#";
  };

  return (
    <div className="md:hidden space-y-4 mb-10 px-4">
      {Object.entries(footerLinks).map(([title, links]) => (
        <div key={title} className="border-b border-gray-800 pb-4">
          <button 
            onClick={() => toggleSection(title)}
            className="w-full flex justify-between items-center py-2 text-left bg-transparent border-none p-0 m-0"
          >
            <span className="font-bold text-white text-lg">{title}</span>
            {openSection === title ? (
              <ChevronUp className="text-[#f68a95]" size={20} />
            ) : (
              <ChevronDown className="text-gray-400" size={20} />
            )}
          </button>
          
          <div className={`grid transition-all duration-300 ease-in-out ${
            openSection === title ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
          }`}>
            <div className="overflow-hidden">
              <ul className="space-y-3 pl-4 border-l border-gray-800 ml-2">
                {links.map((link, index) => {
                  
                  // ✅ FIX: Use anchor tag to keep exact same UI structure in mobile
                  if (link === "Contact Us") {
                    return (
                        <li key={index}>
                            <a 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onContactClick();
                                }} 
                                className="text-gray-400 text-sm block py-1 hover:text-[#f68a95] transition-colors cursor-pointer"
                            >
                                {link}
                            </a>
                        </li>
                    );
                  }

                  const path = getLinkPath(title, link);
                  const isExternal = path.startsWith('http') || path.startsWith('mailto');

                  return (
                    <li key={index}>
                      {path === "#" ? (
                        <span className="text-gray-400 text-sm block py-1 cursor-default">{link}</span>
                      ) : isExternal ? (
                        <a 
                          href={path} 
                          className="text-gray-400 text-sm block py-1 hover:text-[#f68a95] transition-colors"
                        >
                          {link}
                        </a>
                      ) : (
                        <Link 
                          to={path} 
                          className="text-gray-400 text-sm block py-1 hover:text-[#f68a95] transition-colors"
                        >
                          {link}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterAccordion;