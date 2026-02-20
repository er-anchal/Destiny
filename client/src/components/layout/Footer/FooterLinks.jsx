import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../../data';

const FooterLinks = ({ onContactClick }) => {

  // Helper to determine the destination path for any given link item
  const getLinkPath = (category, item) => {
    const cleanItem = item.trim();
    const cleanCat = category.toLowerCase();

    // --- 1. DIRECT PAGE MAPPING ---
    if (cleanItem === "Spiti Valley") return "/package/india-spiti";
    if (cleanItem === "Home") return "/";
    if (cleanItem === "About Us") return "/about";
    
    if (cleanItem === "India Trips" || cleanItem === "Community Trips" || cleanItem === "Weekend Gateways") return "/india";
    if (cleanItem === "International Trips") return "/international";
    if (cleanItem === "Honeymoon Packages" || cleanItem === "Honeymoon Trips" || cleanItem === "Romantic Explorer") return "/honeymoon";
    
    if (cleanItem === "Blogs" || cleanItem === "Privacy Policy") return "#";

    // --- 2. ROMANTIC & SPECIAL ---
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

    // --- 3. CATEGORY MAPPING ---
    if (cleanCat.includes("international")) {
       return `/package/intl-${cleanItem.toLowerCase().replace(/\s+/g, '-')}`;
    }
    if (cleanCat.includes("india")) {
       return `/package/india-${cleanItem.toLowerCase().replace(/\s+/g, '-')}`;
    }

    return "#";
  };

  // Helper for Headers
  const getCategoryPath = (title) => {
    const cleanTitle = title.toLowerCase();
    if (cleanTitle.includes("international")) return "/international";
    if (cleanTitle.includes("india")) return "/india";
    if (cleanTitle.includes("honeymoon") || cleanTitle.includes("romantic") || cleanTitle.includes("special")) return "/honeymoon";
    return "#";
  };

  return (
    <div className="hidden md:flex justify-center py-12 gap-12 xl:gap-24 border-b border-[rgb(1,95,116)] container mx-auto">
      {Object.entries(footerLinks).map(([title, links]) => (
        <ul key={title} className="flex flex-col gap-1 list-none">
          <li>
            {getCategoryPath(title) === "#" ? (
               <span className="font-bold text-white text-lg cursor-default">
                 {title}
               </span>
            ) : (
               <Link 
                 to={getCategoryPath(title)} 
                 className="font-bold text-white text-lg hover:underline"
               >
                 {title}
               </Link>
            )}
          </li>
          
          {links.map((link, index) => {
            // ✅ FIX: Use a standard anchor tag with EXACT same classes as other links
            if (link === "Contact Us") {
                return (
                    <li key={`${title}-${index}`}>
                        <a 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault(); // Prevents jumping to top of page
                                onContactClick();
                            }}
                            className="text-[#b4b1b1] hover:text-gray-300 hover:underline transition-colors cursor-pointer"
                        >
                            {link}
                        </a>
                    </li>
                );
            }

            const path = getLinkPath(title, link);
            const isExternal = path.startsWith("http") || path.startsWith("mailto");
            
            return (
              <li key={`${title}-${index}`}>
                {path === "#" ? (
                  <span className="text-[#b4b1b1] cursor-default">
                    {link}
                  </span>
                ) : isExternal ? (
                  <a 
                    href={path}
                    className="text-[#b4b1b1] hover:text-gray-300 hover:underline transition-colors"
                  >
                    {link}
                  </a>
                ) : (
                  <Link 
                    to={path} 
                    className="text-[#b4b1b1] hover:text-gray-300 hover:underline transition-colors"
                  >
                    {link}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default FooterLinks;