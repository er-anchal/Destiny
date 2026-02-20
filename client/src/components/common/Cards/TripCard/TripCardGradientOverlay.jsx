import React from "react";

const TripCardGradientOverlay = ({ isDeal }) => {
  return (
    <div
      className={`absolute inset-0 ${
        isDeal
          ? "bg-[linear-gradient(180deg,rgba(0,0,0,0)_50%,rgba(0,0,0,0.75)_100%)]"
          : "bg-[linear-gradient(180deg,rgba(0,0,0,0)_70%,rgba(0,0,0,0.67)_100%)]"
      }`}
    />
  );
};

export default TripCardGradientOverlay;
