import React from "react";

export default function ResultCard({ resultUrl, description, handleDelete }) {
  return (
    <div className="cardContainer bg-slate-200">
      <a href={resultUrl} target="_blank">
        <img src={resultUrl} className="h-64 hover:border-2" />
      </a>
      <div className="description">{description}</div>
      <button onClick={() => handleDelete(resultUrl)}>Delete</button>
    </div>
  );
}
