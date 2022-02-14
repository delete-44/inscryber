import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorFlash from "components/error-flash";

describe("ErrorFlash", () => {
  it("provides default error message when none provided", () => {
    render(<ErrorFlash hidden={false} />);

    const alert = screen.getByRole("alert");
    const error = screen.getByText("Error:");
    const message = screen.getByText("Something went wrong! Please try again.");

    expect(alert).toBeInTheDocument();
    expect(error).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
