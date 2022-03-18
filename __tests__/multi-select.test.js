import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect from "components/multi-select";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

describe("MultiSelect", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(
      <MultiSelect
        id="TEST-ID"
        maxOptions={10}
        setSelected={mockCallback}
        selected={[
          { value: "ant_spawner", label: "Ant Spawner" },
          { value: "fecundity", label: "Fecundity" },
        ]}
      />
    );
    jest.clearAllMocks();
  });

  it("renders a combobox with help text", () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });
    const maxText = screen.getByText("10 maximum");

    expect(multiSelectField).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("renders an option for each sigil", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    selectEvent.openMenu(multiSelectField);

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
    expect(screen.getByText(/Moon Strike/)).toBeInTheDocument();
    expect(screen.getByText(/Rabbithole/)).toBeInTheDocument();
    expect(screen.getByText(/Random/)).toBeInTheDocument();
    expect(screen.getByText(/Repulsive/)).toBeInTheDocument();
    expect(screen.getByText(/Sharp Quills/)).toBeInTheDocument();
    expect(screen.getByText(/Sprinter/)).toBeInTheDocument();
    expect(screen.getByText(/Steel Trap/)).toBeInTheDocument();
    expect(screen.getByText(/Stinky/)).toBeInTheDocument();
    expect(screen.getByText(/Tidal Lock/)).toBeInTheDocument();
    expect(screen.getByText(/Touch of Death/)).toBeInTheDocument();
    expect(screen.getByText(/Trifurcated Strike/)).toBeInTheDocument();
    expect(screen.getByText(/Trinket Bearer/)).toBeInTheDocument();
    expect(screen.getByText(/Unkillable/)).toBeInTheDocument();
    expect(screen.getByText(/Waterborne/)).toBeInTheDocument();
    expect(screen.getByText(/Worthy Sacrifice/)).toBeInTheDocument();
  });

  it("correctly shows selected values", () => {
    const removeAntButton = screen.getByRole("button", {
      name: "Remove Ant Spawner",
    });

    const removeFecundityButton = screen.getByRole("button", {
      name: "Remove Fecundity",
    });

    expect(removeAntButton).toBeInTheDocument();
    expect(removeFecundityButton).toBeInTheDocument();

    expect(screen.getByText(/Ant Spawner/)).toBeInTheDocument();
    expect(screen.queryByText(/Bone King/)).toBeNull();
    expect(screen.queryByText(/Mighty Leap/)).toBeNull();
    expect(screen.getByText(/Fecundity/)).toBeInTheDocument();
  });

  it("calls setSelected when options change", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    const removeFecundityButton = screen.getByRole("button", {
      name: "Remove Fecundity",
    });

    // Confirm adding options works
    await selectEvent.select(multiSelectField, /Bone King/);

    expect(mockCallback).toHaveBeenLastCalledWith([
      { label: "Ant Spawner", value: "ant_spawner" },
      { label: "Fecundity", value: "fecundity" },
      { label: "Bone King", value: "bone_king" },
    ]);

    userEvent.click(removeFecundityButton);

    // Confirm removing options works
    expect(mockCallback).toHaveBeenLastCalledWith([
      { label: "Ant Spawner", value: "ant_spawner" },
    ]);
  });
});
