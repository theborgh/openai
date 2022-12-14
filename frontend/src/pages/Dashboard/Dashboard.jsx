import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkAuthorization } from "../../helpers";

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthorization(navigate);
  }, []);

  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">User dashboard</h1>

      <div>
        <Link to="/dalle">DALL&#x2022;E 2</Link>
        <Link to="/davinci">Davinci</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}
