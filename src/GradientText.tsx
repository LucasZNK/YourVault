import React from "react";
import "./GradientText.css";

const GradientText = () => {
  return (
    <div className="gradient-container">
      <h1 className="gradient-text">
        <span className="gradient-block">
          <span className="black-text">Unlock your</span>
          <span className="gradient-foreground-1">Digital Treasure</span>
        </span>
        <span className="gradient-block">
          <span className="black-text">Guard your</span>
          <span className="gradient-foreground-2"> Crypto Secrets</span>
        </span>
        <span className="gradient-block">
          <span className="black-text">Secure your</span>
          <span className="gradient-foreground-3">Blockchain Journey</span>
        </span>
      </h1>
    </div>
  );
};

export default GradientText;
