import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Davinci({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.uid) navigate("/login");
  }, []);

  return (
    <div>
      <h1 className="text-center text-color-primary font-serif mt-4">
        Davinci
      </h1>
    </div>
  );
}
