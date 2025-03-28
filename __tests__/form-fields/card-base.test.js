import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardBase from "@form-fields/card-base";
import userEvent from "@testing-library/user-event";

describe("CardBase", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders radio buttons correctly", () => {
    render(<CardBase base={"vladde"} setBase={mockCallback} />);

    const normalRadio = screen.getByRole("radio", { name: /Normal/ });
    const rareRadio = screen.getByRole("radio", { name: /Rare/ });
    const unsacrificableRadio = screen.getByRole("radio", {
      name: /Terrain/,
    });

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
    render(<CardBase base={"vladde"} setBase={mockCallback} />);

    const cardBaseFlavour = screen.getByText("Which do you want?");
    const cardBaseLabel = screen.getByText("card base");

    expect(cardBaseFlavour).toBeInTheDocument();
    expect(cardBaseLabel).toBeInTheDocument();
  });

  it("correctly sets the rendered card", () => {
    const { rerender } = render(
      <CardBase base={"vladde"} setBase={mockCallback} />
    );

    const normalRadio = screen.getByRole("radio", { name: /Normal/ });
    const rareRadio = screen.getByRole("radio", { name: /Rare/ });
    const unsacrificableRadio = screen.getByRole("radio", {
      name: /Terrain/,
    });

    userEvent.click(rareRadio);

    expect(mockCallback).toHaveBeenLastCalledWith("rare");

    rerender(<CardBase base={"rare"} setBase={mockCallback} />);

    expect(normalRadio).not.toBeChecked();
    expect(rareRadio).toBeChecked();
    expect(unsacrificableRadio).not.toBeChecked();

    userEvent.click(unsacrificableRadio);

    expect(mockCallback).toHaveBeenLastCalledWith("unsacrificable");

    rerender(<CardBase base={"unsacrificable"} setBase={mockCallback} />);

    expect(normalRadio).not.toBeChecked();
    expect(rareRadio).not.toBeChecked();
    expect(unsacrificableRadio).toBeChecked();

    userEvent.click(normalRadio);

    expect(mockCallback).toHaveBeenLastCalledWith("vladde");

    rerender(<CardBase base={"vladde"} setBase={mockCallback} />);

    expect(normalRadio).toBeChecked();
    expect(rareRadio).not.toBeChecked();
    expect(unsacrificableRadio).not.toBeChecked();
  });
});
