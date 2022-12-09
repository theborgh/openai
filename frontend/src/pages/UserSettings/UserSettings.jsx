import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSettings({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.uid) navigate("/login");
  }, []);

  return (
    <div>
      {" "}
      <h1 className="text-center text-color-primary mt-4">User settings</h1>
    </div>
  );
}
