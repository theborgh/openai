import React from "react";
import { faTrashCan, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ResultCard.scss";

export default function ResultCard({ resultUrl, description, handleDelete }) {
  const generateCloudinaryThumbnailUrl = (url) => {
    if (url && !url.includes("cloudinary")) return url;

    let res = url.split("/");
    res.splice(6, 0, "c_fill,g_auto,h_256");
    res = res.join("/");

    return res;
  };

  return (
    <div className="cardContainer bg-slate-200 w-64">
      <a href={resultUrl} className="cardImage" target="_blank">
        <img
          src={generateCloudinaryThumbnailUrl(resultUrl)}
          className="h-64 hover:border-2"
        />
      </a>
      <div className="cardDescription -translate-y-44 w-60 text-sm text-color-primary">
        {description}
      </div>
      <button
        className="cardIcon absolute -translate-y-60 translate-x-56"
        onClick={() => handleDelete(resultUrl)}
      >
        <FontAwesomeIcon
          className="fa-lg text-color-primary"
          icon={faTrashCan}
        />
      </button>
      <a
        className="cardIcon absolute -translate-y-60 translate-x-4"
        href={resultUrl}
        // href="oisdjfi"
        download
      >
        <FontAwesomeIcon
          className="fa-lg text-color-primary"
          icon={faFileArrowDown}
        />
      </a>
    </div>
  );
}
