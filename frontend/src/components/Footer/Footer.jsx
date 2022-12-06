import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      id="footer"
      className="flex flex-wrap bg-footer-bg place-content-center"
    >
      OpenAI Demo (
      <Link to="https://github.com/theborgh/openai" className="font-bold">
        Github
      </Link>
      )
    </div>
  );
}
