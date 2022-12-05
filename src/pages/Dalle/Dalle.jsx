import React, { useState, useEffect } from "react";
import ResultCard from "../../components/ResultCard/ResultCard";

export default function Dalle() {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    // load saved URLs from localstorage
    const urls = window.localStorage.getItem("urls");
    if (urls) {
      const storedResults = urls.split(",");
      setResults(storedResults);
    }
  }, []);

  useEffect(() => {
    // update localStorage to sync it with results
    localStorage.setItem("urls", results.join(","));
  }, [results]);

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage();
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

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      requestOptions
    );

    if (!response.ok) {
      console.error("An error occurred with the fetch: ", response.status);
    } else {
      const data = await response.json();
      const newData = data.data.map((item) => item.url);

      setResults([...newData, ...results]);
      localStorage.setItem("urls", results.join(","));
    }
  };

  return (
    <>
      <h1 className="text-center">DALL-E</h1>
      <p className="text-sm">
        Type a natural language description of the image you would like to see.
        You will get a downloadable version of it in 1024x1024px resolution.
      </p>

      <div className="mt-3">
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
          />
          <div
            onClick={() => setPrompt("")}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Clear
          </div>
          <button
            role="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            disabled={prompt.length < 10 || prompt.split(" ").length < 3}
          >
            Submit
          </button>
        </form>

        <div className="flex flex-wrap mt-5 gap-2">
          {results.map((result) => (
            <ResultCard key={result} resultUrl={result} />
          ))}
        </div>
      </div>
    </>
  );
}
