import React from "react";
import { faTrashCan, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ImageCard.scss";

export default function ResultCard({ resultUrl, description, handleDelete }) {
  const generateCloudinaryThumbnailUrl = (url) => {
    if (url && !url.includes("cloudinary")) return url;

    let res = url.split("/");
    res.splice(6, 0, "c_fill,g_auto,h_256");
    res = res.join("/");

    return res;
  };

  const download = (url, name) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };

  return (
    <div data-testid="ImageCard" className="cardContainer bg-slate-200 w-64">
      <a
        href={resultUrl}
        data-testid="cardImage"
        className="cardImage"
        target="_blank"
      >
        <img
          data-testid="cardImage-img"
          src={generateCloudinaryThumbnailUrl(resultUrl)}
          className="h-64 hover:border-2"
        />
      </a>
      <div
        data-testid="cardDescription"
        className="cardDescription -translate-y-44 w-60 text-sm text-color-primary"
      >
        {description}
      </div>
      <button
        data-testid="cardDelete"
        className="cardIcon absolute -translate-y-60 translate-x-56"
        onClick={() => handleDelete(resultUrl)}
      >
        <FontAwesomeIcon
          className="fa-lg text-color-primary"
          icon={faTrashCan}
        />
      </button>
      <button
        data-testid="cardDownload"
        className="cardIcon absolute -translate-y-60 translate-x-4"
        onClick={() => download(resultUrl, description)}
        download
      >
        <FontAwesomeIcon
          className="fa-lg text-color-primary"
          icon={faFileArrowDown}
        />
      </button>
    </div>
  );
}
