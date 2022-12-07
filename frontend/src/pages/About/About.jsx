import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="text-center text-color-primary my-4">About AI Demo</h1>

      <div className="mx-5 text-color-primary">
        <p className="mb-2">
          AI Demo lets you explore the capabilities of the world's most advanced
          AIs with a user-friendly way.
        </p>
        <p className="mb-2">
          Recent advances in artificial intelligence such as large language
          models, self-play, and more are propelling the capabilities of AI
          forward at a quick pace. AI Demo serves as your personal lab where you
          can tinker with the latest innovations and find out for yourself what
          the hype is all about.
        </p>
        <p className="mb-2">
          AI Demo currently leverages access to programming interfaces provided
          by <a href="https://openai.com/">OpenAI</a>, but is not in any way
          affiliated with OpenAI. As the project grows, AI Demo will showcase
          AIs from a variety of different sources.
        </p>
      </div>
    </div>
  );
}
