import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">User registration</h1>

      <div className="signup-wrapper flex flex-row-reverse content-center justify-items-center 0 h-full">
        <div className="signup-form-container py-20 p-16 flex flex-col items-center	 justify-center sm:w-full ">
          <button
            className="social-signup  mt-6 social-button"
            // onClick={googleSignUp}
          >
            Sign In With Google
          </button>
          <p className="heading-text text-xl mt-6">Or Sign Up via email</p>
          <form className="mt-5">
            <div className="form-item flex gap-2">
              <input
                className="form_input w-1/2"
                type="text"
                id="firstName"
                name="firstName"
                placeholder="first name"
              />
              <input
                className="form_input w-1/2"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="last name"
              />
            </div>
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
                Sign Up
              </button>
              {/* <p className="text-right mt-2">forgot password?</p> */}
            </div>
          </form>
        </div>
        <div className="form-image-background w-5/12 bg-students-bg relative  justify-center hidden md:flex">
          <p className="text-5xl text-center mt-11">
            See what AI is capable of
          </p>

          {/* <img src={stars} className="w-full h-full absolute z-55 top-0 " /> */}
        </div>
      </div>

      <div>
        Already registered? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}
