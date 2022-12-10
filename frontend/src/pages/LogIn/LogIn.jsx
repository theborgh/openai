import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

export default function LogIn({ updateUser }) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", msgBold: "", msgBody: "" });

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        result.user.getIdToken().then((idToken) => {
          const data = {
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
          };

          if (import.meta.env.VITE_VERBOSE === "true")
            console.log("+ signInWithPopup + data: ", data);

          // If user with this email is not already in mongodb, create it
          fetch(`http://localhost:3000/auth/checkuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
              email: result.user.email,
              username: result.user.displayName,
              photoURL: result.user.photoURL,
            }),
          });

          // get JWT token and store in session storage
          fetch(
            `http://localhost:3000/auth/getJWT?email=${result.user.email}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "GET",
            }
          ).then((response) => {
            response.json().then((jwt) => {
              if (import.meta.env.VITE_VERBOSE === "true")
                console.log("+ jwt: ", jwt);
              window.sessionStorage.setItem("jwt", jwt);
            });
          });

          updateUser(data);
          setTimeout(() => {
            navigate("/dashboard");
          }, 100);
        });
      })
      .catch((error) => {
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error, credential);
      });
  };

  const emailAndPWSignIn = (e) => {
    e.preventDefault();
    const { email, password, rememberme } = e.target.elements;

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        userCredential.user.getIdToken().then((idToken) => {
          const user = userCredential.user;

          if (import.meta.env.VITE_VERBOSE === "true")
            console.log("logged in user data: ", userCredential);

          const newUserData = {
            displayName: user.displayName,
            photoURL: user.photoURL,
          };

          if (import.meta.env.VITE_VERBOSE === "true")
            console.log("+ data: ", newUserData);

          // get JWT token and store in session storage
          fetch(`http://localhost:3000/auth/getJWT?email=${user.email}`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }).then((response) => {
            response.json().then((jwt) => {
              if (import.meta.env.VITE_VERBOSE === "true")
                console.log("+ jwt: ", jwt);
              window.sessionStorage.setItem("jwt", jwt);
            });
          });

          updateUser(newUserData);
          setTimeout(() => {
            navigate("/dashboard");
          }, 100);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Sign in Error: ", errorCode, errorMessage);

        setAlert({
          type: "error",
          msgBold: "Sign in error",
          msgBody: errorMessage,
        });
      });
  };

  const handleCloseAlert = () => {
    setAlert({ type: "", msgBold: "", msgBody: "" });
  };

  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">User login</h1>

      <div className="signup-wrapper flex flex-row-reverse content-center justify-items-center 0 h-full">
        <div className="signup-form-container py-20 p-16 flex flex-col items-center justify-center sm:w-full ">
          <button
            className="border-2 p-2 mt-6 text-center flex gap-2 hover:bg-color-disabled"
            onClick={googleSignIn}
          >
            <img src="../../../assets/googlelogo.png" width="20px" />
            <span className="text-sm">Sign in with Google</span>
          </button>
          <div className="mt-3">or login below</div>
          <form onSubmit={emailAndPWSignIn} className="mt-3">
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
                Sign In
              </button>
              {/* <p className="text-right mt-2">forgot password?</p> */}
            </div>
          </form>
          {alert.type && (
            <AlertMessage alert={alert} handleClose={handleCloseAlert} />
          )}
          <div className="mt-4 text-sm">
            Not registered?{" "}
            <Link
              to="/register"
              className="text-color-primary font-bold hover:text-color-secondary"
            >
              Sign up
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
