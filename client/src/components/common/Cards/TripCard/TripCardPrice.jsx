import React from "react";

const TripCardPrice = ({ slide, isDeal }) => {
  return (
    <p
      className={`text-white text-xs md:text-sm font-medium ${
        isDeal ? "group-hover:opacity-0" : ""
      }`}
    >
      {slide.price}
    </p>
  );
};

export default TripCardPrice;
