import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Patches from "@form-fields/patches";
import selectEvent from "react-select-event";

describe("Patches", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Patches setPatchesTF={mockCallback} cardBase="test" />);
    jest.clearAllMocks();
  });

  it("renders a patches combobox", () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    expect(patchesField).toBeInTheDocument();
    expect(patchesField).toHaveTextContent("");
  });

  it("renders a flavourful description & help text", () => {
    const patchesFlavour = screen.getByText("Or ? I won't ask where from...");
    const patchesLabel = screen.getByText("patches");
    const maxText = screen.getByText("4 maximum");

    expect(patchesFlavour).toBeInTheDocument();
    expect(patchesLabel).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("correctly sets transformations", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    await selectEvent.select(patchesField, /Airborne/);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith({ patches: ["airborne"] });

    await selectEvent.select(patchesField, /Bifurcated Strike/);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith({
      patches: ["airborne", "bifurcated_strike"],
    });

    await selectEvent.select(patchesField, /Trifurcated Strike/);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith({
      patches: ["airborne", "bifurcated_strike", "trifurcated_strike"],
    });

    await selectEvent.select(patchesField, /Stinky/);

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith({
      patches: [
        "airborne",
        "bifurcated_strike",
        "trifurcated_strike",
        "stinky",
      ],
    });

    // It does not set additional sigils & renders warning to user
    await selectEvent.select(patchesField, /Bifurcated Strike/);

    expect(
      screen.getByText(/Only 4 patches can be applied at once./)
    ).toBeInTheDocument();

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith({
      patches: [
        "airborne",
        "bifurcated_strike",
        "trifurcated_strike",
        "stinky",
      ],
    });
  });
});
