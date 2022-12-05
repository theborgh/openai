import React, { useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";

export default function Dalle() {
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  });
  const oai = new OpenAIApi(configuration);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPrompt = e.target.elements[0].value;

    if (userPrompt.length < 10 || userPrompt.split(" ").length < 3) {
      console.warn("Prompt is very short, not ideal");
    } else {
      console.log("Will generate image");
      generateImage(oai, userPrompt);
    }
  };

  const generateImage = async (oai, userPrompt) => {
    const response = await oai.createImage({
      prompt: userPrompt,
      n: 1,
      size: "1024x1024",
    });

    const image_url = response.data.data[0].url;
    console.log("The url is: ", image_url);
  };

  useEffect(() => {}, []);

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
            type="text"
            id="description"
            className="w-full form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <button
            role="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
