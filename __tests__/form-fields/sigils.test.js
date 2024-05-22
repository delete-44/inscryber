import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sigils from "@form-fields/sigils";
import selectEvent from "react-select-event";

describe("Sigils", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Sigils setSigilsTF={mockCallback} cardBase="test" />);
    jest.clearAllMocks();
  });

  it("renders a sigils combobox", () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    expect(sigilsField).toBeInTheDocument();
    expect(sigilsField).toHaveTextContent("");
  });

  it("renders a flavourful description & help text", () => {
    const sigilsFlavour = screen.getByText("Does this creature bear any ?");
    const sigilsLabel = screen.getByText("sigils");
    const maxText = screen.getByText("4 maximum");

    expect(sigilsFlavour).toBeInTheDocument();
    expect(sigilsLabel).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("correctly sets transformations", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith({ sigils: ["airborne"] });

    await selectEvent.select(sigilsField, /Bifurcated Strike/);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith({
      sigils: ["airborne", "bifurcated_strike"],
    });

    await selectEvent.select(sigilsField, /Amorphous/);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith({
      sigils: ["airborne", "bifurcated_strike", "random"],
    });

    await selectEvent.select(sigilsField, /Bellist/);

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith({
      sigils: ["airborne", "bifurcated_strike", "random", "bellist"],
    });

    // It does not set additional sigils & renders warning to user
    await selectEvent.select(sigilsField, /Airborne/);

    expect(
      screen.getByText(/Only 4 sigils can be applied at once./)
    ).toBeInTheDocument();

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith({
      sigils: ["airborne", "bifurcated_strike", "random", "bellist"],
    });
  });
});
