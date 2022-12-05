import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";

export default function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>

      <div>
        <p>Which model would you like to try?</p>
        <div className="flex">
          <div className="model">
            <Link to="/dalle" className="font-bold text-lg">
              DALL-E
            </Link>
            <div className="description text-sm">
              Create images from a text description in natural language
            </div>
          </div>
          <div className="model">
            <Link to="/davinci" className="font-bold text-lg">
              Davinci
            </Link>
            <div className="description text-sm">
              The most advanced text model, based on GPT3
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
