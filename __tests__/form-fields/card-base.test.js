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
    render(<CardBase value={"vladde"} setValue={mockCallback} />);

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
    render(<CardBase value={"vladde"} setValue={mockCallback} />);

    const cardBaseFlavour = screen.getByText("Which do you want?");
    const cardBaseLabel = screen.getByText("card base");

    expect(cardBaseFlavour).toBeInTheDocument();
    expect(cardBaseLabel).toBeInTheDocument();
  });

  it("correctly sets the rendered card", async () => {
    const { rerender } = render(
      <CardBase value={"vladde"} setValue={mockCallback} />
    );

    const normalRadio = screen.getAllByRole("radio")[0];
    const rareRadio = screen.getAllByRole("radio")[1];
    const unsacrificableRadio = screen.getAllByRole("radio")[2];

    userEvent.click(rareRadio);

    expect(mockCallback).toHaveBeenLastCalledWith("rare");

    rerender(<CardBase value={"rare"} setValue={mockCallback} />);

    expect(normalRadio).not.toBeChecked();
    expect(rareRadio).toBeChecked();
    expect(unsacrificableRadio).not.toBeChecked();

    userEvent.click(unsacrificableRadio);

    expect(mockCallback).toHaveBeenLastCalledWith("unsacrificable");

    rerender(<CardBase value={"unsacrificable"} setValue={mockCallback} />);

    expect(normalRadio).not.toBeChecked();
    expect(rareRadio).not.toBeChecked();
    expect(unsacrificableRadio).toBeChecked();

    userEvent.click(normalRadio);

    expect(mockCallback).toHaveBeenLastCalledWith("vladde");

    rerender(<CardBase value={"vladde"} setValue={mockCallback} />);

    expect(normalRadio).toBeChecked();
    expect(rareRadio).not.toBeChecked();
    expect(unsacrificableRadio).not.toBeChecked();
  });
});
