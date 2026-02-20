import React from "react";
import TestimonialHeader from "./TestimonialHeader";
import TestimonialMetaDate from "./TestimonialMetaDate";
import TestimonialQuote from "./TestimonialQuote";
import TestimonialReadMoreLink from "./TestimonialReadMoreLink";

const TestimonialCardContent = ({ data }) => {
  return (
    <div className="flex-grow">
      <TestimonialHeader name={data.name} />
      <TestimonialMetaDate date={data.date} />
      <TestimonialQuote text={data.text} />
      <TestimonialReadMoreLink link={data.link} />
    </div>
  );
};

export default TestimonialCardContent;
