import React from "react";

const TripCardDealHoverOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center">
        <span className="text-white text-2xl md:text-3xl">→</span>
      </div>
    </div>
  );
};

export default TripCardDealHoverOverlay;
