import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">User dashboard</h1>

      <div>
        <Link to="/dalle">DALL&#x2022;E 2</Link>
        <Link to="/davinci">Davinci</Link>
      </div>
    </div>
  );
}
