import React from "react";
import "./StarRating.css";

const StarRating = ({ rating, outOf }) => {
  const stars = [];
  for (let i = 0; i < outOf; i++) {
    stars.push(
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
