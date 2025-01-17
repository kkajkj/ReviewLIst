import React from "react";
import "./Tooltip.css";
const Tooltip = ({ text, children }) => {
  return (
    <span className="tooltip-container">
      {children}
      <span className="tooltip-text">{text}</span>
    </span>
  );
};

export default Tooltip;
