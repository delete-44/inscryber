import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect from "components/multi-select";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";
import * as constants from "components/constants";

describe("MultiSelect", () => {
  const mockCallback = jest.fn();

  constants.SIGILS = [{ value: "leshy", label: "Beasts" }];
  constants.GRIMORA_SIGILS = [{ value: "grimora", label: "Dead" }];
  constants.MAGNIFICUS_SIGILS = [{ value: "magnificus", label: "Magicks" }];
  constants.KAYCEE_SIGILS = [{ value: "kaycee", label: "Old Data" }];

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
    await selectEvent.select(multiSelectField, /Beasts/);

    expect(mockCallback).toHaveBeenLastCalledWith([
      { label: "Ant Spawner", value: "ant_spawner" },
      { label: "Fecundity", value: "fecundity" },
      { label: "Beasts", value: "leshy" },
    ]);

    userEvent.click(removeFecundityButton);

    // Confirm removing options works
    expect(mockCallback).toHaveBeenLastCalledWith([
      { label: "Ant Spawner", value: "ant_spawner" },
    ]);
  });

  it("renders a group of options for each scrybe", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    selectEvent.openMenu(multiSelectField);

    expect(screen.getByText(/Leshy/)).toBeInTheDocument();
    expect(screen.getByText(/Grimora/)).toBeInTheDocument();
    expect(screen.getByText(/Magnificus/)).toBeInTheDocument();
    expect(screen.getByText(/Kaycee/)).toBeInTheDocument();

    expect(screen.getByText(/Beasts/)).toBeInTheDocument();
    expect(screen.getByText(/Dead/)).toBeInTheDocument();
    expect(screen.getByText(/Magicks/)).toBeInTheDocument();
    expect(screen.getByText(/Old Data/)).toBeInTheDocument();
  });
});
