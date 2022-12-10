import React from "react";
import { Link } from "react-router-dom";
// import "./ModelCard.scss";

export default function ModelCard({
  modelName,
  modelDescription,
  modelPath,
  imagePath,
  imageSize,
}) {
  return (
    <div style={{ width: `${imageSize}px` }}>
      <Link to={`/${modelPath}`} className="font-bold text-lg">
        {modelName}
        <img src={imagePath} />
        <div className="description text-sm">{modelDescription}</div>
      </Link>
    </div>
  );
}
