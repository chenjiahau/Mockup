import { render, screen, fireEvent } from "@testing-library/react";
import { logRoles } from "@testing-library/dom";

import App from "../App";
import { expect } from "vitest";

test("renders learn react link", () => {
  render(<App />);
  const titleElement = screen.getByRole("heading", { name: /No title/i });
  expect(titleElement).toBeInTheDocument();

  const buttonElement = screen.getByRole("button", { name: /Click me/i });
  expect(buttonElement).toBeInTheDocument();

  fireEvent.click(buttonElement);
  const newTitleElement = screen.getByRole("heading", { name: /Hello/i });
  expect(newTitleElement).toBeInTheDocument();
});
