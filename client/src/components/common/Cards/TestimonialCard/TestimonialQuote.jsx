import React from "react";

const TestimonialQuote = ({ text }) => {
  return (
    <div className="relative pl-6">
      <span className="absolute top-[-10px] left-0 text-[rgb(1,95,116)] text-5xl font-bold leading-none">"</span>
      <p className="text-[rgb(83,82,82)] text-xs min-[500px]:text-[0.875rem] text-justify leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default TestimonialQuote;
