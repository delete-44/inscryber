import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cost from "@form-fields/cost";
import selectEvent from "react-select-event";

describe("Cost", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Cost setCostTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a cost combobox", () => {
    const costField = screen.getByRole("combobox", {
      "aria-label": /Cost/,
    });

    expect(costField).toBeInTheDocument();
    expect(costField).toHaveTextContent("");
  });

  it("renders a flavourful description", () => {
    const costFlavour = screen.getByText("There's always a ...");
    const costLabel = screen.getByText("cost");

    expect(costFlavour).toBeInTheDocument();
    expect(costLabel).toBeInTheDocument();
  });
});
