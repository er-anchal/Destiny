import React from "react";
import { Link } from 'react-router-dom';
import TripCardContainer from "./TripCardContainer";
import TripCardImage from "./TripCardImage";
import TripCardGradientOverlay from "./TripCardGradientOverlay";
import TripCardContent from "./TripCardContent";
import TripCardDealHoverOverlay from "./TripCardDealHoverOverlay";

const TripCard = ({ slide, variant = "standard" }) => {
  if (!slide) return null;

  const isDeal = variant === "deal";
  const isVideo = variant === "video";
  const linkId = slide.id || (slide.title || "").toLowerCase().replace(/\s+/g, '-');

  return (
    <Link to={`/package/${linkId}`} className="block h-full w-full cursor-pointer group text-inherit no-underline">
      <TripCardContainer>
        <TripCardImage slide={slide} />
        <TripCardGradientOverlay isDeal={isDeal} />
        <TripCardContent slide={slide} isDeal={isDeal} isVideo={isVideo} />
        {isDeal && <TripCardDealHoverOverlay />}
      </TripCardContainer>
    </Link>
  );
};

export default TripCard;