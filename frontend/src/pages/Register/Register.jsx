import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import jwt_decode from "jwt-decode";

export default function SignUp({ updateUser }) {
  const [formUsername, setFormUsername] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ type: "", msgBold: "", msgBody: "" });

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    // delete previous jwt if present
    sessionStorage.removeItem("jwt");

    const googleResult = await signInWithPopup(auth, provider);
    const googleResponse = await fetch(
      `http://localhost:3000/auth/getJWT?email=${googleResult.user.email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );

    const jwt = await googleResponse.json();

    if (import.meta.env.VITE_VERBOSE === "true") console.log("+ jwt: ", jwt);
    window.sessionStorage.setItem("jwt", jwt);

    const data = {
      displayName: googleResult.user.displayName,
      photoURL: googleResult.user.photoURL,
      openaiApiKey:
        sessionStorage.getItem("jwt") &&
        jwt_decode(sessionStorage.getItem("jwt")).openaiApiKey,
      email:
        sessionStorage.getItem("jwt") &&
        jwt_decode(sessionStorage.getItem("jwt")).email,
    };

    if (import.meta.env.VITE_VERBOSE === "true")
      console.log("+ signInWithPopup + data: ", data);

    updateUser(data);

    // If user with this email is not already in mongodb, create it
    fetch(`http://localhost:3000/auth/checkuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      mode: "cors",
      body: JSON.stringify({
        email: googleResult.user.email,
        username: googleResult.user.displayName,
        photoURL: googleResult.user.photoURL,
      }),
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 200);
  };

  const emailAndPWSignUp = (e) => {
    e.preventDefault();
    const { username, email, password, rememberme } = e.target.elements;

    // delete previous jwt if present
    sessionStorage.removeItem("jwt");

    const data = {
      username: username.value,
      email: email.value,
      password: password.value,
      rememberme: rememberme.checked,
    };

    // try to create user in DB
    fetch(`http://localhost:3000/auth/createuser`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username: formUsername, uid: data.email }),
    })
      .then((response) => {
        if (response.status === 200) {
          // If response status is 200, create user in google
          createUserWithEmailAndPassword(auth, data.email, data.password).then(
            (userCredential) => {
              // Signed in via Google
              userCredential.user.getIdToken().then((idToken) => {
                const user = userCredential.user;

                const newUserData = {
                  displayName: formUsername,
                  photoURL: user.photoURL,
                };

                if (import.meta.env.VITE_VERBOSE === "true")
                  console.log("+ user: ", newUserData);

                updateUser(newUserData);

                // If all is good, get JWT token and store in session storage
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

                    const data = {
                      displayName: user.displayName,
                      photoURL: user.photoURL,
                      openaiApiKey:
                        sessionStorage.getItem("jwt") &&
                        jwt_decode(sessionStorage.getItem("jwt")).openaiApiKey,
                      email:
                        sessionStorage.getItem("jwt") &&
                        jwt_decode(sessionStorage.getItem("jwt")).email,
                    };

                    if (import.meta.env.VITE_VERBOSE === "true")
                      console.log("+ signInWithPopup + data: ", data);

                    updateUser(data);
                  });
                });

                // Successful registration, navigate to dashboard
                setTimeout(() => {
                  navigate("/dashboard");
                }, 200);
              });
            }
          );
        } else {
          // response.status is not 200, probably because of duplicate username
          response.json().then((errorMessage) => {
            setAlert({
              type: "error",
              msgBold: "Signup error: ",
              msgBody: errorMessage,
            });
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Signup Error: ", errorCode, errorMessage);

        setAlert({
          type: "error",
          msgBold: "Signup error",
          msgBody: errorMessage,
        });
      });
  };

  const handleCloseAlert = () => {
    setAlert({ type: "", msgBold: "", msgBody: "" });
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
                onChange={(e) => setFormUsername(e.target.value)}
                className="form-control block px-3 py-1.5 text-base font-normal text-color-disabled bg-white bg-clip-padding border border-solid border-color-primary rounded m-0 focus:text-color-primary focus:bg-white focus:border-color-primary focus:outline-none mb-1"
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formUsername}
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
          {alert.type && (
            <AlertMessage alert={alert} handleClose={handleCloseAlert} />
          )}
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
