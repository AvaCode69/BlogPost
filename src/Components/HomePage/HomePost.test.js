import HomePost from "./HomePost";
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders HomePage", () => {
  render(<HomePost />);
  const linkElement = screen.getByText("No more posts to show");
  expect(linkElement).toBeInTheDocument();
});
