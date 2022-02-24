import { render, screen, waitFor } from "@testing-library/react";
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

  it("renders a flavourful description", () => {
    const patchesFlavour = screen.getByText("Or ? I won't ask where from...");
    const patchesLabel = screen.getByText("patches");

    expect(patchesFlavour).toBeInTheDocument();
    expect(patchesLabel).toBeInTheDocument();
  });

  it("correctly sets a transformation", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    await selectEvent.select(patchesField, /Airborne/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryption:ResizedPatches:airborne/fl_layer_apply,g_north_west,y_148,x_32/"
      );
    });
  });

  it("correctly sets multiple transformations", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    await selectEvent.select(patchesField, /Airborne/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryption:ResizedPatches:airborne/fl_layer_apply,g_north_west,y_148,x_32/"
      );
    });

    await selectEvent.select(patchesField, /Bifurcated Strike/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryption:ResizedPatches:airborne/fl_layer_apply,g_north_west,y_148,x_32/" +
          "l_Inscryption:ResizedPatches:bifurcated_strike/fl_layer_apply,g_west,y_10,x_48/"
      );
    });

    await selectEvent.select(patchesField, /Trifurcated Strike/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryption:ResizedPatches:airborne/fl_layer_apply,g_north_west,y_148,x_32/" +
          "l_Inscryption:ResizedPatches:bifurcated_strike/fl_layer_apply,g_west,y_10,x_48/" +
          "l_Inscryption:ResizedPatches:trifurcated_strike/fl_layer_apply,g_east,y_-96,x_28/"
      );
    });

    await selectEvent.select(patchesField, /Stinky/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(4);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryption:ResizedPatches:airborne/fl_layer_apply,g_north_west,y_148,x_32/" +
          "l_Inscryption:ResizedPatches:bifurcated_strike/fl_layer_apply,g_west,y_10,x_48/" +
          "l_Inscryption:ResizedPatches:trifurcated_strike/fl_layer_apply,g_east,y_-96,x_28/" +
          "l_Inscryption:ResizedPatches:stinky/a_-20/fl_layer_apply,g_north,x_64/"
      );
    });

    // It does not set additional sigils & renders warning to user
    await selectEvent.select(patchesField, /Bifurcated Strike/);

    expect(
      screen.getByText(/Only 4 patches can be applied at once./)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledTimes(4);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryption:ResizedPatches:airborne/fl_layer_apply,g_north_west,y_148,x_32/" +
          "l_Inscryption:ResizedPatches:bifurcated_strike/fl_layer_apply,g_west,y_10,x_48/" +
          "l_Inscryption:ResizedPatches:trifurcated_strike/fl_layer_apply,g_east,y_-96,x_28/" +
          "l_Inscryption:ResizedPatches:stinky/a_-20/fl_layer_apply,g_north,x_64/"
      );
    });
  });

  it("removes the transformation when clear field is clicked", async () => {
    const patchesField = screen.getByRole("combobox", {
      "aria-label": /Patches/,
    });

    await selectEvent.select(patchesField, /Airborne/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryption:ResizedPatches:airborne/fl_layer_apply,g_north_west,y_148,x_32/"
      );
    });

    const removeButton = screen.getByRole("button", {
      name: "Remove Airborne",
    });
    userEvent.click(removeButton);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenLastCalledWith("");
    });
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
