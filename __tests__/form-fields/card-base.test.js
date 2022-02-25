import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardBase from "@form-fields/card-base";
import selectEvent from "react-select-event";

describe("CardBase", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<CardBase setSigilsTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a flavourful description", () => {
    const cardBaseFlavour = screen.getByText("Which do you want?");
    const cardBaseLabel = screen.getByText("card base");

    expect(cardBaseFlavour).toBeInTheDocument();
    expect(cardBaseLabel).toBeInTheDocument();
  });
});
