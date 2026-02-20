import React from "react";

const TripCardImage = ({ slide }) => {
  return (
    <img
      src={slide.image}
      alt={slide.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  );
};

export default TripCardImage;
