import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardBase from "@form-fields/card-base";
import selectEvent from "react-select-event";

describe("CardBase", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<CardBase value={"vladde"} setValue={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders radio buttons correctly", () => {
    const normalRadio = screen.getAllByRole("radio")[0];
    const rareRadio = screen.getAllByRole("radio")[1];
    const unsacrificableRadio = screen.getAllByRole("radio")[2];

    expect(normalRadio).toBeInTheDocument();
    expect(normalRadio).toHaveAttribute("id", "vladde");
    expect(normalRadio).toBeChecked();

    expect(rareRadio).toBeInTheDocument();
    expect(rareRadio).toHaveAttribute("id", "rare");
    expect(rareRadio).not.toBeChecked();

    expect(unsacrificableRadio).toBeInTheDocument();
    expect(unsacrificableRadio).toHaveAttribute("id", "unsacrificable");
    expect(unsacrificableRadio).not.toBeChecked();
  });

  it("renders a flavourful description", () => {
    const cardBaseFlavour = screen.getByText("Which do you want?");
    const cardBaseLabel = screen.getByText("card base");

    expect(cardBaseFlavour).toBeInTheDocument();
    expect(cardBaseLabel).toBeInTheDocument();
  });
});
