import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Spinner from "components/spinner";

describe("Spinner", () => {
  it("shows spinner unless hidden", () => {
    render(<Spinner hidden={false} />);

    const spinner = screen.getByRole("status");

    expect(spinner).toBeInTheDocument();
    expect(spinner).not.toHaveClass("hidden");
  });

  it("hides spinner when state demands", () => {
    render(<Spinner hidden />);

    const spinner = screen.getByRole("status");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("hidden");
  });
});
