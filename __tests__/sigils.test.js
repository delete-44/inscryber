import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sigils from "components/sigils";
import selectEvent from "react-select-event";

describe("Sigils", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Sigils setSigilsTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a sigils combobox", () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    expect(sigilsField).toBeInTheDocument();
    expect(sigilsField).toHaveTextContent("");
  });

  it("renders a flavourful description", () => {
    const sigilsFlavour = screen.getByText("Does this creature have any ?");
    const sigilsLabel = screen.getByText("sigils");

    expect(sigilsFlavour).toBeInTheDocument();
    expect(sigilsLabel).toBeInTheDocument();
  });

  it("correctly sets a transformation", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        "l_v1644605839:Inscryption:Sigils:airborne.png,g_south,y_64/"
      );
    });

    await selectEvent.select(sigilsField, /Bifurcated Strike/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        "l_v1644605839:Inscryption:Sigils:bifurcated_strike.png,g_south,y_64/"
      );
    });
  });

  it("completely removes the transformation when field is empty", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith(
        "l_v1644605839:Inscryption:Sigils:airborne.png,g_south,y_64/"
      );
    });

    await selectEvent.select(sigilsField, /No sigils/);

    await waitFor(() => {
      expect(mockCallback).toHaveBeenCalledWith("");
    });
  });

  it("renders an option for each sigil", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    selectEvent.openMenu(sigilsField);

    expect(screen.getByText(/No sigil/)).toBeInTheDocument();

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
