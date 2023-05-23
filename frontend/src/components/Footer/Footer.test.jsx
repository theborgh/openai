// test Footer.jsx
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// test Footer
describe("Footer", () => {
  test("renders Footer component", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("Footer");
    expect(footerElement).toBeInTheDocument();
  });

  test("renders Footer component with correct text", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("Footer");
    expect(footerElement).toHaveTextContent("AI Demo <Github />");
  });

  test("renders Footer component with correct color", () => {
    render(<Footer />);
    const footerElement = screen.getByTestId("Footer");
    expect(footerElement).toHaveClass("bg-color-primary");
  });
});
