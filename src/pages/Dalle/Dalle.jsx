import React from "react";

export default function Dalle() {
  return (
    <>
      <h1 className="text-center">DALL-E</h1>
      <p className="text-sm">
        Type a natural language description of the image you would like to see.
        You will get a downloadable version of it in 1024x1024px resolution.
      </p>

      <div className="mt-3">
        <form className="flex place-content-center">
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
