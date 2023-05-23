import { render, screen } from "@testing-library/react";
import AlertMessage from "./AlertMessage";

// test AlertMessage
describe("AlertMessage", () => {
  const alert = {
    type: "warning",
    msgBold: "Action required:",
    msgBody:
      "Add an openai api key in the user settings page to start using DALL-E and Davinci",
  };

  test("renders AlertMessage component", () => {
    render(<AlertMessage alert={alert} />);
    const alertMessageElement = screen.getByTestId("AlertMessage");
    expect(alertMessageElement).toBeInTheDocument();
  });

  test("renders AlertMessage component with correct text", () => {
    render(<AlertMessage alert={alert} />);
    const alertMessageElement = screen.getByTestId("AlertMessage");
    expect(alertMessageElement).toHaveTextContent(
      "Action required: Add an openai api key in the user settings page to start using DALL-E and Davinci"
    );
  });

  test("renders AlertMessage component with correct color", () => {
    render(<AlertMessage alert={alert} />);
    const alertMessageElement = screen.getByTestId("AlertMessage");
    expect(alertMessageElement).toHaveClass("bg-yellow-100");
  });

  test("renders AlertMessage component with correct icon color", () => {
    render(<AlertMessage alert={alert} />);
    const alertMessageElement = screen.getByTestId("AlertMessage");
    expect(alertMessageElement.querySelector("svg")).toHaveClass(
      "text-yellow-500"
    );
  });

  test("renders AlertMessage component with close button", () => {
    render(<AlertMessage alert={alert} />);
    const alertMessageElement = screen.getByTestId("AlertMessage");
    const closeButtonElement = screen.getByTestId("CloseButton");
    expect(alertMessageElement).toContainElement(closeButtonElement);
  });
});
