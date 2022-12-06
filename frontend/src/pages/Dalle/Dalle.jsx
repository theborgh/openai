import React, { useState, useEffect } from "react";
import ResultCard from "../../components/ResultCard/ResultCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Dalle() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // load saved URLs from localstorage
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
  }, []);

  useEffect(() => {
    // update localStorage to sync it with results
    localStorage.setItem(
      "urls",
      results.map((el) => `${el.url}#${el.description}`).join(";")
    );
  }, [results]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage();
  };

  const handleDelete = (url) => {
    setResults(results.filter((el) => el.url !== url));
  };

  const generateImage = async () => {
    const params = {
      prompt,
      n: 1,
      size: "1024x1024",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(import.meta.env.VITE_OPENAI_API_KEY),
      },
      body: JSON.stringify(params),
    };

    setIsLoading(true);

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      requestOptions
    );

    setIsLoading(false);

    if (!response.ok) {
      console.error("An error occurred with the fetch: ", response.status);
    } else {
      const data = await response.json();
      const newData = Array.from(data.data, (item) => ({
        url: item,
        description: prompt,
      }));

      setResults([...newData, ...results]);
      localStorage.setItem("urls", results.join("#"));
    }
  };

  return (
    <>
      <h1 className="text-center">DALL-E</h1>

      <div className="mt-6">
        <form
          className="flex place-content-center gap-2 mx-5"
          onSubmit={handleSubmit}
        >
          <input
            onChange={(e) => setPrompt(e.target.value)}
            type="text"
            id="description"
            className="w-full form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={prompt}
            placeholder="Type a natural language description of the image you would like to see &ndash; the more descriptive, the better"
          />
          <div
            onClick={() => setPrompt("")}
            className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent hover:cursor-pointer"
          >
            Clear
          </div>
          <button
            role="submit"
            className="bg-transparent text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:bg-blue-500 hover:border-transparent rounded disabled:text-indigo-200 disabled:border-indigo-200 disabled:hover:text-indigo-200 disabled:hover:bg-white"
            disabled={
              isLoading || prompt.length < 10 || prompt.split(" ").length < 3
            }
          >
            {isLoading ? (
              <span className="flex">
                <FontAwesomeIcon
                  className="animate-spin h-5 w-5 mr-3 text-indigo-200"
                  icon={faSpinner}
                />
                Loading...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <div className="flex flex-wrap mt-5 gap-2">
          {results.map((result) => (
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
