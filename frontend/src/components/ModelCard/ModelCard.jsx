import React from "react";
import { Link } from "react-router-dom";

export default function ModelCard({
  modelName,
  modelDescription,
  modelPath,
  imagePath,
  imageSize,
}) {
  return (
    <div
      data-testid="ModelCard"
      style={{ width: `${imageSize}px` }}
      className="hover:opacity-75"
    >
      <Link
        to={`/${modelPath}`}
        className="font-bold text-lg text-color-primary"
      >
        {modelName}
        <img src={imagePath} alt={modelName} />
        <div className="description text-sm">{modelDescription}</div>
      </Link>
    </div>
  );
}
