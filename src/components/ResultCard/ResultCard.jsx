import React from "react";
import { Link } from "react-router-dom";

export default function ResultCard({ resultUrl }) {
  return (
    <div>
      <img src={resultUrl} className="h-20" />
    </div>
  );
}
