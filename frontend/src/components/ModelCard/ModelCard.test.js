// test ModelCard component
import ModelCard from "./ModelCard";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("ModelCard", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ModelCard
          modelName="Test Model"
          modelDescription="Test Description"
          modelPath="test"
          imagePath="test.jpg"
          imageSize="500"
        />
      </MemoryRouter>
    );
  });

  test("renders model card", () => {
    const modelName = screen.getByTestId("ModelCard");
    expect(modelName).toBeInTheDocument();
  });

  test("renders model name", () => {
    const modelName = screen.getByText("Test Model");
    expect(modelName).toBeInTheDocument();
  });

  test("renders model description", () => {
    const modelDescription = screen.getByText("Test Description");
    expect(modelDescription).toBeInTheDocument();
  });

  test("renders model image", () => {
    const modelImage = screen.getByAltText("Test Model");
    expect(modelImage).toBeInTheDocument();
  });

  test("renders model link", () => {
    const modelLink = screen.getByRole("link");
    expect(modelLink).toBeInTheDocument();
  });

  test("renders model link with correct path", () => {
    const modelLink = screen.getByRole("link");
    expect(modelLink).toHaveAttribute("href", "/test");
  });

  test("renders model link with correct text", () => {
    const modelLink = screen.getByRole("link");
    expect(modelLink).toHaveTextContent("Test Model");
  });

  test("renders model link with correct image", () => {
    const modelLink = screen.getByRole("link");
    expect(modelLink).toContainHTML("<img");
  });
});
