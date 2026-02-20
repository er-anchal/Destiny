import React from "react";

const TestimonialCardAvatar = ({ img, name }) => {
  return (
    <div className="shrink-0 w-[80px] h-[80px] min-[500px]:w-[100px] min-[500px]:h-[100px] rounded-full border border-[rgb(1,95,116)] p-1 overflow-hidden">
      <img src={img} alt={name} className="w-full h-full object-cover rounded-full" />
    </div>
  );
};

export default TestimonialCardAvatar;
