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

  it("renders an option for each patch", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    selectEvent.openMenu(patchesField);

    expect(screen.getByText(/Airborne/)).toBeInTheDocument();
    expect(screen.getByText(/Ant Spawner/)).toBeInTheDocument();
    expect(screen.getByText(/Bees Within/)).toBeInTheDocument();
    expect(screen.getByText(/Bellist/)).toBeInTheDocument();
    expect(screen.getByText(/Bifurcated Strike/)).toBeInTheDocument();
    expect(screen.getByText(/Bone King/)).toBeInTheDocument();
    expect(screen.getByText(/Burrower/)).toBeInTheDocument();
    expect(screen.getByText(/Corpse Eater/)).toBeInTheDocument();
    expect(screen.getByText(/Dam Builder/)).toBeInTheDocument();
    expect(screen.getByText(/Fecundity/)).toBeInTheDocument();
    expect(screen.getByText(/Fledgeling/)).toBeInTheDocument();
    expect(screen.getByText(/Frozen Away/)).toBeInTheDocument();
    expect(screen.getByText(/Guardian/)).toBeInTheDocument();
    expect(screen.getByText(/Hefty/)).toBeInTheDocument();
    expect(screen.getByText(/Hoarder/)).toBeInTheDocument();
    expect(screen.getByText(/Leader/)).toBeInTheDocument();
    expect(screen.getByText(/Loose Tail/)).toBeInTheDocument();
    expect(screen.getByText(/Many Lives/)).toBeInTheDocument();
    expect(screen.getByText(/Mighty Leap/)).toBeInTheDocument();
    expect(screen.getByText(/Rabbithole/)).toBeInTheDocument();
    expect(screen.getByText(/Random/)).toBeInTheDocument();
    expect(screen.getByText(/Sharp Quills/)).toBeInTheDocument();
    expect(screen.getByText(/Sprinter/)).toBeInTheDocument();
    expect(screen.getByText(/Stinky/)).toBeInTheDocument();
    expect(screen.getByText(/Touch of Death/)).toBeInTheDocument();
    expect(screen.getByText(/Trifurcated Strike/)).toBeInTheDocument();
    expect(screen.getByText(/Trinket Bearer/)).toBeInTheDocument();
    expect(screen.getByText(/Unkillable/)).toBeInTheDocument();
    expect(screen.getByText(/Waterborne/)).toBeInTheDocument();
    expect(screen.getByText(/Worthy Sacrifice/)).toBeInTheDocument();
  });
});
