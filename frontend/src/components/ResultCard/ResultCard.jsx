import React from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ResultCard.scss";

export default function ResultCard({ resultUrl, description, handleDelete }) {
  const generateCloudinaryThumbnailUrl = (url) => {
    if (!url.includes("cloudinary")) return url;

    let res = url.split("/");
    res.splice(6, 0, "c_fill,g_auto,h_256");

    return res.join("/");
  };

  return (
    <div className="cardContainer bg-slate-200 w-64">
      <a href={resultUrl} className="cardImage" target="_blank">
        <img
          src={generateCloudinaryThumbnailUrl(resultUrl)}
          className="h-64 hover:border-2"
        />
      </a>
      <div className="cardDescription -translate-y-48 w-64">{description}</div>
      <button
        className="cardTrashcan absolute -translate-y-60 translate-x-56"
        onClick={() => handleDelete(resultUrl)}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </div>
  );
}
