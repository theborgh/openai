import React from "react";
import { Link } from "react-router-dom";

export default function LogIn() {
  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">User login</h1>

      <div className="signup-wrapper flex flex-row-reverse content-center justify-items-center 0 h-full">
        <div className="signup-form-container py-20 p-16 flex flex-col items-center	 justify-center sm:w-full ">
          <button
            className="social-signup  mt-6 text-center social-button"
            // onClick={googleSignIn}
          >
            Login with Google
          </button>
          <form className="mt-5">
            <div className="form-item">
              <input
                className="form_input"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-item">
              <input
                className="form_input"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <input
              className="mr-1 border-none"
              type="checkbox"
              id="rememberme"
              name="rememberme"
            />
            <label
              className="font-bold text-gray-500 text-sm"
              htmlFor="rememberme"
            >
              Remember me
            </label>
            <div className="cta">
              <button className="signup-btn mt-6" type="submit">
                Sign In
              </button>
              {/* <p className="text-right mt-2">forgot password?</p> */}
            </div>
          </form>
        </div>
        <div className="form-image-background w-5/12 bg-students-bg relative  justify-center hidden md:flex">
          <p className="text-5xl text-center mt-11">
            See what AI is capable of
          </p>
        </div>
      </div>

      <div>
        Not registered? <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
}
