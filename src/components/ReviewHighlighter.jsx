import React from "react";
import "./reviewHighlighter.css";
import { LuUserPlus2 } from "react-icons/lu";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import StarRating from "./StarRating";
import Tooltip from "./Tooltip";
const ReviewHighlighter = ({ review }) => {
  return (
    <div className="container">
      <img src={review.source.icon} alt="icon" width={40} height={40} />
      <div className="review-card">
        <div className="name-icons">
          <div>
            <span className="name">{review.reviewer_name}</span>
            <span style={{ color: "GrayText", marginLeft: "0.30rem" }}>
              wrote a review at
              <span style={{ color: "black", marginLeft: "0.30rem" }}>
                {review.source.name}
              </span>
            </span>
          </div>

          <div className="right-icons">
            <LuUserPlus2 />
            <IoBookmarkOutline />
            <IoEllipsisHorizontalSharp />
          </div>
        </div>
        <div className="rating-date">
          <StarRating
            rating={review.rating_review_score}
            outOf={review.out_of}
          />
          <span style={{ color: "GrayText" }}>{review.date}</span>
        </div>
        <p style={{ color: "gray", width: "100%", cursor: "pointer" }}>
          {highlightSentences(review)}
        </p>
      </div>
    </div>
  );
};

const highlightSentences = (review) => {
  const content = review.content;
  const analytics = review.analytics;

  if (!analytics.length) {
    return content;
  }

  let highlightedContent = [];
  let currentIndex = 0;

  analytics.forEach((analytic, index) => {
    const { highlight_indices, topic, sentiment } = analytic;

    highlight_indices.forEach(([start, end, sentiment], subIndex) => {
      // Add text before the highlight
      if (currentIndex < start) {
        highlightedContent.push(content.slice(currentIndex, start));
      }
      // Add highlighted text with tooltip
      highlightedContent.push(
        <Tooltip key={`${index}-${subIndex}`} text={topic}>
          <span className={`highlight ${sentiment.toLowerCase()}`}>
            {content.slice(start, end)}
          </span>
        </Tooltip>
      );
      currentIndex = end;
    });
  });

  // Add remaining text
  if (currentIndex < content.length) {
    highlightedContent.push(content.slice(currentIndex));
  }

  return highlightedContent;
};

export default ReviewHighlighter;
