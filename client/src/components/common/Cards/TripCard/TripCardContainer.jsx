import React from "react";

const TripCardContainer = ({ children }) => {
  return (
    <div className="group relative h-[240px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 w-full">
      {children}
    </div>
  );
};

export default TripCardContainer;
