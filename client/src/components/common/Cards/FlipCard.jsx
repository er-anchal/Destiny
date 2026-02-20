import React from 'react';
import { Link } from 'react-router-dom';

export const FlipCard = ({ data }) => {
  // Generate a slug/ID for the link. 
  // Priority: data.id -> data.title -> data.alt
  const linkId = data.id || (data.title || data.alt || "").toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/package/${linkId}`} className="block w-full h-full cursor-pointer">
      <div className="flip-card-perspective w-full aspect-[5/7] group bg-transparent">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={data.front || data.img} alt={data.alt} className="w-full h-full object-cover rounded-xl" />
          </div>
          <div className="flip-card-back">
            <img src={data.back || data.img} alt={data.alt} className="w-full h-full object-cover rounded-xl" />
            
            {/* Optional: Add an overlay on the back to make it look interactive */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
               <span className="text-white font-bold border border-white px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white hover:text-black transition-colors">
                 View Details
               </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FlipCard;