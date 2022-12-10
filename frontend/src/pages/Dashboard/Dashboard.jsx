import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModelCard from "../../components/ModelCard/ModelCard";
import { checkAuthorization } from "../../helpers";
import models from "../../modelData";

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthorization(navigate);
  }, []);

  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">
        Welcome, {user.displayName}
      </h1>

      <h2 className="text-center text-color-primary text-xl font-bold mt-6">
        Play with AI models
      </h2>
      <div className="flex gap-2 place-content-center">
        {models.map((model) => (
          <ModelCard
            key={model.name}
            modelName={model.name}
            modelDescription={model.description}
            modelPath={model.modelPath}
            imagePath={model.imagePath}
            imageSize={200}
          />
        ))}
      </div>

      <h2 className="text-center text-color-primary text-xl font-bold mt-6">
        <Link to="/settings">Change your settings</Link>
      </h2>
    </div>
  );
}
