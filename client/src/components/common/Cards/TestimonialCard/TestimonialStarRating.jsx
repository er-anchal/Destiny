import React from "react";
import { Star } from 'lucide-react';

const TestimonialStarRating = () => {
  return (
    <div className="flex gap-1 text-[#c9c903] text-xs">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={12} fill="currentColor" />
      ))}
    </div>
  );
};

export default TestimonialStarRating;
