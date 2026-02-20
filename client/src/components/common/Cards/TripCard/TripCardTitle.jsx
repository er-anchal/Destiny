import React from "react";

const TripCardTitle = ({ slide, isDeal }) => {
  return (
    <h3
      className={`text-white text-lg md:text-2xl font-bold leading-tight mb-1 md:mb-2 ${
        isDeal ? "group-hover:opacity-0" : ""
      }`}
    >
      {slide.title}
    </h3>
  );
};

export default TripCardTitle;
