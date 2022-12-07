import React from "react";

export default function Footer() {
  return (
    <div
      id="footer"
      className="flex flex-wrap bg-color-primary place-content-center text-color-disabled"
    >
      OpenAI Demo &lt;
      <a
        href="https://github.com/theborgh/openai"
        className="font-bold hover:text-color-secondary"
      >
        Github
      </a>{" "}
      &nbsp;/&gt; is not affiliated with OpenAI
    </div>
  );
}
