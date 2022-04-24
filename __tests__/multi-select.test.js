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
  constants.PO3_SIGILS = [{ value: "PO3", label: "Technology" }];
  constants.KAYCEE_SIGILS = [{ value: "kaycee", label: "Old Data" }];
  constants.ADDITIONAL_SIGILS = [{ value: "additional", label: "GOTY" }];

  beforeEach(() => {
    render(
      <MultiSelect
        id="TEST-ID"
        maxOptions={5}
        setTF={mockCallback}
        cardBase="test"
      />
    );
    jest.clearAllMocks();
  });

  it("renders a combobox with help text", () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });
    const maxText = screen.getByText("5 maximum");

    expect(multiSelectField).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("correctly shows selected values", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    await selectEvent.select(multiSelectField, /Beasts/);
    await selectEvent.select(multiSelectField, /Magicks/);
    await selectEvent.select(multiSelectField, /Dead/);

    const removeBeastsButton = screen.getByRole("button", {
      name: "Remove Beasts",
    });

    const removeMagicksButton = screen.getByRole("button", {
      name: "Remove Magicks",
    });

    const removeDeadButton = screen.getByRole("button", {
      name: "Remove Dead",
    });

    expect(removeBeastsButton).toBeInTheDocument();
    expect(removeMagicksButton).toBeInTheDocument();
    expect(removeDeadButton).toBeInTheDocument();

    expect(screen.getByText(/Beasts/)).toBeInTheDocument();
    expect(screen.getByText(/Dead/)).toBeInTheDocument();
    expect(screen.getByText(/Magicks/)).toBeInTheDocument();
    expect(screen.queryByText(/Technology/)).toBeNull();
    expect(screen.queryByText(/Old Data/)).toBeNull();
    expect(screen.queryByText(/GOTY/)).toBeNull();
  });

  it("sets and unsets transformation when options change", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    // Adding options
    await selectEvent.select(multiSelectField, /Old Data/);

    expect(mockCallback).toHaveBeenLastCalledWith({ "TEST-ID": ["kaycee"] });

    // Removing options
    const removeOldDataButton = screen.getByRole("button", {
      name: "Remove Old Data",
    });

    userEvent.click(removeOldDataButton);

    expect(mockCallback).toHaveBeenLastCalledWith({});
  });

  it("renders a group of options for each scrybe", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    selectEvent.openMenu(multiSelectField);

    expect(screen.getByText(/Leshy/)).toBeInTheDocument();
    expect(screen.getByText(/Grimora/)).toBeInTheDocument();
    expect(screen.getByText(/Magnificus/)).toBeInTheDocument();
    expect(screen.getByText(/PO3/)).toBeInTheDocument();
    expect(screen.getByText(/Kaycee/)).toBeInTheDocument();
    expect(screen.getByText(/Additional/)).toBeInTheDocument();

    expect(screen.getByText(/Beasts/)).toBeInTheDocument();
    expect(screen.getByText(/Dead/)).toBeInTheDocument();
    expect(screen.getByText(/Magicks/)).toBeInTheDocument();
    expect(screen.getByText(/Technology/)).toBeInTheDocument();
    expect(screen.getByText(/Old Data/)).toBeInTheDocument();
    expect(screen.getByText(/GOTY/)).toBeInTheDocument();
  });

  it("prevents users selecting more than the max", async () => {
    const multiSelectField = screen.getByRole("combobox", {
      "aria-label": /TEST-ID/,
    });

    await selectEvent.select(multiSelectField, /Beasts/);
    await selectEvent.select(multiSelectField, /Dead/);
    await selectEvent.select(multiSelectField, /Magicks/);
    await selectEvent.select(multiSelectField, /Technology/);
    await selectEvent.select(multiSelectField, /Old Data/);

    selectEvent.openMenu(multiSelectField);

    expect(
      screen.getByText(/Only 5 TEST-ID can be applied at once/)
    ).toBeInTheDocument();
  });
});
