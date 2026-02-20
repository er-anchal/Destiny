import React from "react";

const TestimonialReadMoreLink = ({ link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="text-[rgb(1,95,116)] font-bold text-sm flex justify-end mt-2 hover:underline"
    >
      Continue Reading
    </a>
  );
};

export default TestimonialReadMoreLink;
