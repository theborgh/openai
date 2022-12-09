import React from "react";
import ModelCard from "../../components/ModelCard/ModelCard";
import models from "../../modelData";

export default function Homepage() {
  return (
    <div>
      <h1 className="text-center mt-4">
        <span className="text-color-secondary">AI</span>
        <span className="text-color-disabled">Demo</span>
      </h1>

      <div>
        <p>
          Test the capabilities of the today's most advanced artificial
          intelligence algorithms in a simple and user-friendly way
        </p>
        <div className="flex p-4 place-content-center gap-4">
          {models.map((model) => (
            <ModelCard
              key={model.name}
              modelName={model.name}
              modelDescription={model.description}
              modelPath={model.modelPath}
              imagePath={model.imagePath}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
