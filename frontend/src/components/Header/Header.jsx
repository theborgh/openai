import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import "./header.scss";

export default function Header({ user, updateUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (import.meta.env.VITE_VERBOSE === "true")
      console.log("handleLogout, auth = ", auth);

    signOut(auth)
      .then(() => {
        if (import.meta.env.VITE_VERBOSE === "true")
          console.log("user logged out");

        const newUserData = {
          displayName: "",
          photoURL: "",
        };

        sessionStorage.removeItem("jwt");

        updateUser(newUserData);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      id="header"
      className="flex bg-color-primary p-2 place-content-between"
    >
      <div id="logo">
        <Link className="logo font-black" to={"/"}>
          <span className="text-color-secondary">AI</span>
          <span className="text-color-disabled">Demo</span>
        </Link>
      </div>
      <div id="links" className="flex justify-end space-x-2">
        {user.displayName && (
          <div className="navbarLink text-color-disabled hover:text-color-secondary">
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>
        )}
        <div className="navbarLink text-color-disabled hover:text-color-secondary">
          <Link to={"/about"}>About</Link>
        </div>
        <div className="navbarLink text-color-secondary">
          {user.displayName ? (
            <div
              onClick={handleLogout}
              className="flex gap-2 hover:cursor-pointer"
            >
              <span>Log out</span>
              <img
                src={user.photoURL || "../../../assets/anonymous.png"}
                className="w-6 bg-slate-400"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}
