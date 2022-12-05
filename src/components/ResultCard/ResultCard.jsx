import React from "react";

export default function ResultCard({ resultUrl }) {
  return (
    <div>
      <a href={resultUrl} target="_blank">
        <img src={resultUrl} className="h-64 hover:border-2" />
      </a>
    </div>
  );
}
