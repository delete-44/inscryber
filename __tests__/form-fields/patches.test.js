import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Patches from "@form-fields/patches";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

describe("Patches", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Patches setPatchesTF={mockCallback} />);
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

  it("correctly sets a transformation", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    await selectEvent.select(patchesField, /Airborne/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Patches:v1:airborne/t_patch_1/"
    );
  });

  it("correctly sets multiple transformations", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    await selectEvent.select(patchesField, /Airborne/);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Patches:v1:airborne/t_patch_1/"
    );

    await selectEvent.select(patchesField, /Bifurcated Strike/);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Patches:v1:airborne/t_patch_1/" +
        "l_Inscryber:Patches:v1:bifurcated_strike/t_patch_2/"
    );

    await selectEvent.select(patchesField, /Trifurcated Strike/);

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Patches:v1:airborne/t_patch_1/" +
        "l_Inscryber:Patches:v1:bifurcated_strike/t_patch_2/" +
        "l_Inscryber:Patches:v1:trifurcated_strike/t_patch_3/"
    );

    await selectEvent.select(patchesField, /Stinky/);

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Patches:v1:airborne/t_patch_1/" +
        "l_Inscryber:Patches:v1:bifurcated_strike/t_patch_2/" +
        "l_Inscryber:Patches:v1:trifurcated_strike/t_patch_3/" +
        "l_Inscryber:Patches:v1:stinky/t_patch_4/"
    );

    // It does not set additional sigils & renders warning to user
    await selectEvent.select(patchesField, /Bifurcated Strike/);

    expect(
      screen.getByText(/Only 4 patches can be applied at once./)
    ).toBeInTheDocument();

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Patches:v1:airborne/t_patch_1/" +
        "l_Inscryber:Patches:v1:bifurcated_strike/t_patch_2/" +
        "l_Inscryber:Patches:v1:trifurcated_strike/t_patch_3/" +
        "l_Inscryber:Patches:v1:stinky/t_patch_4/"
    );
  });

  it("removes the transformation when clear field is clicked", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    await selectEvent.select(patchesField, /Airborne/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Patches:v1:airborne/t_patch_1/"
    );

    const removeButton = screen.getByRole("button", {
      name: "Remove Airborne",
    });
    userEvent.click(removeButton);

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });
});
