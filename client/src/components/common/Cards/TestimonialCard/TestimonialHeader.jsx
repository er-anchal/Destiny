import React from "react";
import TestimonialStarRating from "./TestimonialStarRating";

const TestimonialHeader = ({ name }) => {
  return (
    <div className="flex justify-between items-center mb-1">
      <p className="mb-0 font-bold text-black text-sm min-[500px]:text-base">{name}</p>
      <TestimonialStarRating />
    </div>
  );
};

export default TestimonialHeader;
