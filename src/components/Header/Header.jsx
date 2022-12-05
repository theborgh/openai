import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
  return (
    <div className="flex bg-header-bg p-2 place-content-between">
      <div id="logo">
        <Link className="logo font-black" to={"/"}>
          <span className="text-logo1">OpenAI</span>
          <span className="text-logo2">Demo</span>
        </Link>
      </div>
      <div id="links" className="flex justify-end space-x-2">
        <div className="navbarLink text-logo1">
          <Link to={"/about"}>About</Link>
        </div>
        <div className="navbarLink">Sign In</div>
      </div>
    </div>
  );
}
