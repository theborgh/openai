import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import ModelCard from "../../components/ModelCard/ModelCard";
import { checkAuthorization } from "../../helpers";
import models from "../../modelData";

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [alertIsClosed, setAlertIsClosed] = useState(false);
  const alert = {
    type: "warning",
    msgBold: "Action required:",
    msgBody:
      "Add an openai api key in the user settings page to start using DALL-E and Davinci",
  };

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
      {!alertIsClosed && !user.openaiApiKey && (
        <AlertMessage
          alert={alert}
          handleClose={() => setAlertIsClosed(true)}
        />
      )}

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
