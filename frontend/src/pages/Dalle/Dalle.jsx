import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResultCard from "../../components/ImageCard/ImageCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./Dalle.scss";
import { checkAuthorization } from "../../helpers";

export default function Dalle({ user }) {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // checkAuthorization(navigate);

    async function fetchData() {
      const res = await loadDataFromMongo();
      setResults(res.reverse());
    }

    fetchData();

    if (import.meta.env.VITE_DEBUGGING === "true") {
      // load saved URLs from localstorage into state
      const urls = window.localStorage.getItem("urls");
      if (urls) {
        const storedObjects = urls.split(";");
        setResults(
          Array.from(storedObjects, (el) => ({
            url: el.split("#")[0],
            description: el.split("#")[1],
          }))
        );
      }
    }
  }, []);

  useEffect(() => {
    if (import.meta.env.VITE_DEBUGGING === "true") {
      // update localStorage to sync it with state
      localStorage.setItem(
        "urls",
        results.map((el) => `${el.url}#${el.description}`).join(";")
      );
      // testing: post data in state to BE (mongo + cloudinary) at EVERY state update!

      console.log("results is: ", results);
    }
  }, [results]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage();
  };

  const handleDelete = async (url) => {
    const elementToDelete = results.find((el) => el.url === url);
    setResults(results.filter((el) => el.url !== url));

    // delete image from DB (find by id)
    const response = await fetch("http://localhost:3000/dalle/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(elementToDelete),
    });

    await response.json();
  };

  const generateImage = async () => {
    if (prompt.length < 10 || prompt.split(" ").length < 3) {
      console.error("invalid prompt");
      return;
    }

    const params = {
      prompt,
      n: 1,
      size: "1024x1024",
      username: user.displayName,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: "Bearer " + "", // TODO: replace with jtw token from session storage
      },
      body: JSON.stringify(params),
    };

    setIsLoading(true);

    const response = await fetch(
      "http://localhost:3000/dalle/generateimages",
      requestOptions
    );

    setIsLoading(false);

    if (!response.ok) {
      console.error("An error occurred with the fetch: ", response.status);
    } else {
      const newData = await response.json();

      if (import.meta.env.VITE_VERBOSE === "true") {
        console.log("newData: ", newData);
      }

      setResults([...newData, ...results]);

      if (import.meta.env.VITE_DEBUGGING === "true") {
        localStorage.setItem("urls", results.join("#"));
      }
    }
  };

  const loadDataFromMongo = async () => {
    const response = await fetch(
      `http://localhost:3000/dalle/images?username=${user.displayName}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        method: "GET",
        mode: "cors",
      }
    );

    const data = await response.json();

    return data;
  };

  return (
    <>
      <h1 className="text-center text-color-primary font-serif mt-4">
        DALL&#x2022;E 2
      </h1>

      <div className="mt-3 mb-6">
        <form
          className="flex flex-col place-content-center gap-2 mx-5 lg:flex-row"
          onSubmit={handleSubmit}
        >
          <input
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            id="description"
            className="w-full form-control block px-3 py-1.5 text-base font-normal text-color-disabled bg-white bg-clip-padding border border-solid border-color-primary rounded m-0 focus:text-color-primary focus:bg-white focus:border-color-primary focus:outline-none"
            value={prompt}
            placeholder="Type a natural language description of the image you want to see &ndash; the more descriptive, the better"
          />
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={() => setPrompt("")}
              className="bg-transparent text-color-primary font-semibold py-2 px-4 border border-color-primary rounded hover:cursor-pointer disabled:text-color-disabled disabled:border-color-disabled disabled:hover:text-color-disabled grow lg:grow-0"
              disabled={!prompt.length}
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-transparent text-color-primary font-semibold hover:text-white py-2 px-4 border border-color-primary hover:bg-color-primary hover:border-transparent rounded disabled:text-color-disabled disabled:border-color-disabled disabled:hover:text-color-disabled disabled:hover:bg-white grow lg:grow-0"
              disabled={
                isLoading || prompt.length < 10 || prompt.split(" ").length < 3
              }
            >
              {isLoading ? (
                <span className="flex place-content-center">
                  <FontAwesomeIcon
                    className="animate-spin h-5 w-5 mr-3 text-color-disabled"
                    icon={faSpinner}
                  />
                  Loading...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        <div className="grid cont mt-5 gap-2 place-content-center">
          {results &&
            results.length !== 0 &&
            results.map((result) => (
              <ResultCard
                key={result.url}
                resultUrl={result.url}
                description={result.description}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      </div>
    </>
  );
}
