import App from "./App";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders App", () => {
  render(<App />);
  const linkElement = screen.getByText("No more posts to show");
  expect(linkElement).toBeInTheDocument();
});
