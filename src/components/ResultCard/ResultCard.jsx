import React from "react";
import "./ResultCard.scss";

export default function ResultCard({ resultUrl, description, handleDelete }) {
  return (
    <div className="cardContainer bg-slate-200 w-64">
      <a href={resultUrl} className="cardImage" target="_blank">
        <img src={resultUrl} className="h-64 hover:border-2" />
      </a>
      <div className="cardDescription -translate-y-48 w-64">{description}</div>
      <button onClick={() => handleDelete(resultUrl)}>Delete</button>
    </div>
  );
}
