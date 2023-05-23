// test ImageCard.js

import ImageCard from "./ImageCard";
import { render, screen } from "@testing-library/react";

describe("ImageCard", () => {
  const resultUrl =
    "https://res.cloudinary.com/duttyuznh/image/upload/v1670591496/dalle/p85ylurrzkahiauxsugm.png";
  const description = "test description";

  beforeEach(() => {
    render(<ImageCard resultUrl={resultUrl} description={description} />);
  });

  test("renders ImageCard component", () => {
    expect(screen.getByTestId("ImageCard")).toBeInTheDocument();
  });

  test("renders cardImage", () => {
    expect(screen.getByTestId("cardImage")).toBeInTheDocument();
  });

  test("renders cardDescription", () => {
    expect(screen.getByTestId("cardDescription")).toBeInTheDocument();
  });

  test("renders cardDelete", () => {
    expect(screen.getByTestId("cardDelete")).toBeInTheDocument();
  });

  test("renders cardImage with correct src", () => {
    expect(screen.getByTestId("cardImage-img")).toHaveAttribute("src");
    expect(screen.getByTestId("cardImage-img").getAttribute("src")).toContain(
      "c_fill,g_auto,h_256"
    );
  });

  test("renders cardImage with correct href", () => {
    expect(screen.getByTestId("cardImage")).toHaveAttribute("href");
    expect(screen.getByTestId("cardImage").getAttribute("href")).toContain(
      resultUrl
    );
  });

  test("renders cardDescription with correct text", () => {
    expect(screen.getByTestId("cardDescription")).toHaveTextContent(
      description
    );
  });

  test("renders cardDownload", () => {
    expect(screen.getByTestId("cardDownload")).toBeInTheDocument();
  });
});
