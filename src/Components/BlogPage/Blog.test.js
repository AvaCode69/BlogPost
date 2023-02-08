import Blog from "./Blog";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders HomePage", () => {
  render(<Blog />);
  const linkElement = screen.getByText("Blog");
  expect(linkElement).toBeInTheDocument();
});
