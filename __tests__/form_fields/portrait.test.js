import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Portrait from "@form_fields/portrait";

describe("Portrait", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Portrait setPortraitTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a field upload field and hides status indicators by default", () => {
    const fileField = screen.getByLabelText("portrait");
    const error = screen.getByRole("alert");
    const spinner = screen.getByRole("status");

    expect(fileField).toBeInTheDocument();
    expect(fileField).not.toBeDisabled();

    expect(error).toHaveClass("hidden");
    expect(spinner).toHaveClass("hidden");
  });

  it("renders a flavourful description", () => {
    const fileFlavour = screen.getByText("Finally... a .");
    const fileLabel = screen.getByText("portrait");

    expect(fileFlavour).toBeInTheDocument();
    expect(fileLabel).toBeInTheDocument();
  });
});
