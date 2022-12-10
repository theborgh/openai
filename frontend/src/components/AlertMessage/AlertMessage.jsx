import React, { useState, useEffect } from "react";

export default function AlertMessage({ alert, handleClose }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (import.meta.env.VITE_DEBUG === "true") console.log("alert: ", alert);

    switch (alert.type) {
      case "error":
        setColor("red");
        break;
      case "warning":
        setColor("yellow");
        break;
      default:
        setColor("green");
    }
  }, []);

  return (
    <div
      className={`m-3 bg-${color}-100 border border-${color}-400 text-${color}-700 px-4 py-3 rounded flex gap-2 place-content-between`}
      role="alert"
    >
      <div>
        <strong className="font-bold">{alert.msgBold} </strong>
        <span className="block sm:inline">{alert.msgBody}</span>
      </div>
      <span onClick={handleClose}>
        <svg
          className={`fill-current h-6 w-6 text-${color}-500`}
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>
  );
}
