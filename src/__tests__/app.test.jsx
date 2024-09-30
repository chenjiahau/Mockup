import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { logRoles } from "@testing-library/dom";

import App from "../App";
import { expect } from "vitest";

test("Render correctly", async () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  expect(nameInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();

  const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  expect(confirmPasswordInput).toBeInTheDocument();

  await userEvent.type(nameInput, "John Doe");
  expect(nameInput).toHaveValue("John Doe");

  await userEvent.type(passwordInput, "password");
  expect(passwordInput).toHaveValue("password");

  await userEvent.type(confirmPasswordInput, "password");
  expect(confirmPasswordInput).toHaveValue("password");
});
