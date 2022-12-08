import React from "react";
import { Link } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";

export default function SignUp({ updateUser }) {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        const userData = {
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
          loginID: user.uid,
        };

        console.log("+ user data: ", userData);
        updateUser(true, user.id);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error, error.message);
      });
  };

  const emailAndPWSignUp = (e) => {
    e.preventDefault();
    const { username, email, password, rememberme } = e.target.elements;

    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      rememberme: rememberme.checked,
    };

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        if (import.meta.env.VITE_VERBOSE === "true")
          console.log("+ user: ", user);

        if (data.rememberme) {
          window.localStorage.setItem("uid", user.accessToken);
          window.sessionStorage.removeItem("uid");
        } else {
          window.sessionStorage.setItem("uid", user.accessToken);
          window.localStorage.removeItem("uid");
        }

        updateUser(true, user.id);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign in Error: ", errorCode, errorMessage);
      });
  };

  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">User registration</h1>

      <div className="signup-wrapper flex flex-row-reverse content-center justify-items-center 0 h-full">
        <div className="signup-form-container py-20 p-16 flex flex-col items-center justify-center sm:w-full ">
          <button
            className="border-2 p-2 mt-6 text-center flex gap-2 hover:bg-color-disabled"
            onClick={googleSignIn}
          >
            <img src="../../../assets/googlelogo.png" width="20px" />
            <span className="text-sm">Sign in with Google</span>
          </button>
          <div className="mt-3">or register below</div>
          <form onSubmit={emailAndPWSignUp} className="mt-3">
            <div className="form-item">
              <input
                className="form-control block px-3 py-1.5 text-base font-normal text-color-disabled bg-white bg-clip-padding border border-solid border-color-primary rounded m-0 focus:text-color-primary focus:bg-white focus:border-color-primary focus:outline-none mb-1"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
              />
            </div>
            <div className="form-item">
              <input
                className="form-control block px-3 py-1.5 text-base font-normal text-color-disabled bg-white bg-clip-padding border border-solid border-color-primary rounded m-0 focus:text-color-primary focus:bg-white focus:border-color-primary focus:outline-none mb-1"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="form-item">
              <input
                className="form-control block px-3 py-1.5 text-base font-normal text-color-disabled bg-white bg-clip-padding border border-solid border-color-primary rounded m-0 focus:text-color-primary focus:bg-white focus:border-color-primary focus:outline-none"
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
              className="font-bold text-color-primary text-sm"
              htmlFor="rememberme"
            >
              Remember me
            </label>
            <div className="flex place-content-center">
              <button
                className="bg-transparent text-color-primary font-semibold hover:text-white py-2 px-4 border border-color-primary hover:bg-color-primary hover:border-transparent rounded disabled:text-color-disabled disabled:border-color-disabled disabled:hover:text-color-disabled disabled:hover:bg-white grow lg:grow-0 mt-2 "
                type="submit"
              >
                Sign Up
              </button>
              {/* <p className="text-right mt-2">forgot password?</p> */}
            </div>
          </form>
          <div className="mt-4 text-sm">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-color-primary font-bold hover:text-color-secondary"
            >
              Sign in
            </Link>
          </div>
        </div>
        <div className="form-image-background w-5/12 bg-students-bg relative  justify-center hidden md:flex">
          <p className="text-5xl text-center mt-11">
            See what AI is capable of
          </p>
        </div>
      </div>
    </div>
  );
}
