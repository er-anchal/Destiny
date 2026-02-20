import React from "react";
import TestimonialCardAvatar from "./TestimonialCardAvatar";
import TestimonialCardContent from "./TestimonialCardContent";

export const TestimonialCard = ({ data }) => {
  return (
    <div className="flex gap-4 p-4 min-[500px]:p-8 bg-[#f0eeee] rounded-xl shadow-sm">
      <TestimonialCardAvatar img={data.img} name={data.name} />
      <TestimonialCardContent data={data} />
    </div>
  );
};

export default TestimonialCard;
