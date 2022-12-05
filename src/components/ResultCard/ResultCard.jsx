import React from "react";

export default function ResultCard({ resultUrl, description }) {
  return (
    <div className="container">
      <a href={resultUrl} target="_blank">
        <img src={resultUrl} className="h-64 hover:border-2" />
      </a>
      <div className="description">{description}</div>
    </div>
  );
}
