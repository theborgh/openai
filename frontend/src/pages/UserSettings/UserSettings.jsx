import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthorization } from "../../helpers";

export default function UserSettings({ user, updateKey }) {
  const navigate = useNavigate();
  const [key, setKey] = useState(user.openaiApiKey);

  useEffect(() => {
    checkAuthorization(navigate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PUT key, if successful then update user.openaiApiKey
    const response = await fetch("http://localhost:3000/auth/updatekey", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      mode: "cors",
      body: JSON.stringify({
        key,
        email: user.email,
      }),
    });

    await response.json();

    updateKey(key);

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
  };

  const handleDelete = () => {
    console.log("handleDelete");
  };

  return (
    <div>
      <h1 className="text-center text-color-primary mt-4">User settings</h1>

      <h2 className="text-center text-color-primary text-xl font-bold mt-6 mb-3">
        Set your OpenAI api key
      </h2>
      <p>
        You need to provide your own OpenAI api key in order to use DALL-E and
        Davinci. Create an account for free to receive a $18 credit for the
        first 3 months (enough to generate 900 DALLE images and approximately
        1000 Davinci responses). When you exhaust your free credits, you can
        choose to pay for further credits. Check OpenAI for more information.
      </p>

      <form
        className="flex flex-col place-content-center gap-2 mx-5 md:flex-row my-2"
        onSubmit={handleSubmit}
      >
        <input
          onChange={(e) => setKey(e.target.value)}
          type="text"
          id="description"
          className="w-full form-control block px-3 py-1.5 text-base font-normal text-color-disabled bg-white bg-clip-padding border border-solid border-color-primary rounded m-0 focus:text-color-primary focus:bg-white focus:border-color-primary focus:outline-none"
          value={key}
          placeholder="Your OpenAI api key"
        />
        <button
          type="submit"
          className="bg-transparent text-color-primary font-semibold hover:text-white py-2 px-4 border border-color-primary hover:bg-color-primary hover:border-transparent rounded disabled:text-color-disabled disabled:border-color-disabled disabled:hover:text-color-disabled disabled:hover:bg-white grow md:grow-0"
        >
          Update
        </button>
      </form>

      <h2 className="text-center text-color-primary text-xl font-bold mt-6 mb-3">
        Delete account
      </h2>
      <p>
        Delete the account? This action is permanent and cannot be reversed. You
        will permanently lose all your files.
      </p>
      <button
        onClick={handleDelete}
        type="submit"
        className="mt-4 bg-transparent text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:bg-red-700 hover:border-transparent rounded disabled:text-color-disabled disabled:border-color-disabled disabled:hover:text-color-disabled disabled:hover:bg-white grow md:grow-0"
      >
        Delete account
      </button>
    </div>
  );
}
