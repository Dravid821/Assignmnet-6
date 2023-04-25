import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const RatingComponent = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-star-${i}`} />);
    }

    // Render half star if applicable
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half-star" />);
    }

    // Render empty stars to fill the remaining space
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FaRegStar key={`empty-star-${i}`} />);
    }

    return stars;
  };

  return (
    <div className="row">
    <div className="d-flex justify-content-between">
      <span className=" bg-warning text-center">
        <span className="d-flex" style={{ fontSize: "15px" }}>{renderStars()}</span>
      </span>
    </div>
    </div>
  );
};

export default RatingComponent;
