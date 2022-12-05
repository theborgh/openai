import React from "react";
import { Link } from "react-router-dom";
import "./ModelCard.scss";

export default function ModelCard({
  modelName,
  modelDescription,
  modelPath,
  imagePath,
}) {
  return (
    <div className="model">
      <Link to={`/${modelPath}`} className="font-bold text-lg">
        {modelName}

        <img src={imagePath} className="" />
        <div className="description text-sm">{modelDescription}</div>
      </Link>
    </div>
  );
}
