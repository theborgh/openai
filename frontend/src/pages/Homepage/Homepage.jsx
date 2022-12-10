import React from "react";
import { Link } from "react-router-dom";
import ModelCard from "../../components/ModelCard/ModelCard";
import models from "../../modelData";

export default function Homepage() {
  return (
    <div>
      <h1 className="text-center my-4">
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
              imageSize={300}
            />
          ))}
        </div>
        <div className="cta flex place-content-center mt-5">
          <Link to="/register">
            <button className="bg-transparent text-color-primary font-semibold hover:text-white py-2 px-4 border border-color-primary hover:bg-color-primary hover:border-transparent rounded disabled:text-color-disabled disabled:border-color-disabled disabled:hover:text-color-disabled disabled:hover:bg-white">
              Join AI Demo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
