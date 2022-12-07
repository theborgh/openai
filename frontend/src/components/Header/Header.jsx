import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
  return (
    <div
      id="header"
      className="flex bg-color-primary p-2 place-content-between"
    >
      <div id="logo">
        <Link className="logo font-black" to={"/"}>
          <span className="text-color-secondary">OpenAI</span>
          <span className="text-color-disabled">Demo</span>
        </Link>
      </div>
      <div id="links" className="flex justify-end space-x-2">
        <div className="navbarLink text-color-disabled hover:text-color-secondary">
          <Link to={"/about"}>About</Link>
        </div>
        <div className="navbarLink text-color-secondary">
          <Link to={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
