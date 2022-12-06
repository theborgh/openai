import React from "react";
import ModelCard from "../../components/ModelCard/ModelCard";
import models from "../../modelData";

export default function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>

      <div>
        <p>Which model would you like to try?</p>
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
