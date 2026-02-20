import React from "react";
import TripCardSaleBadge from "./TripCardSaleBadge";
import TripCardTitle from "./TripCardTitle";
import TripCardPrice from "./TripCardPrice";

const TripCardContent = ({ slide, isDeal, isVideo }) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-end w-full p-4 md:p-6 transition-opacity duration-300
        ${isVideo ? "items-center text-center" : "items-start text-left"}
        ${!isDeal ? "group-hover:opacity-0" : ""}`}
    >
      {isDeal && <TripCardSaleBadge />}

      <TripCardTitle slide={slide} isDeal={isDeal} />
      <TripCardPrice slide={slide} isDeal={isDeal} />
    </div>
  );
};

export default TripCardContent;
