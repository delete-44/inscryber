import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sigils from "@form-fields/sigils";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";

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

  it("renders a flavourful description & help text", () => {
    const sigilsFlavour = screen.getByText("Does this creature have any ?");
    const sigilsLabel = screen.getByText("sigils");
    const maxText = screen.getByText("2 maximum");

    expect(sigilsFlavour).toBeInTheDocument();
    expect(sigilsLabel).toBeInTheDocument();
    expect(maxText).toBeInTheDocument();
  });

  it("correctly sets a single transformation", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedSigils:airborne/t_sigil/"
    );
  });

  it("correctly sets multiple transformations", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedSigils:airborne/t_sigil/"
    );

    await selectEvent.select(sigilsField, /Bifurcated Strike/);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedSigils:airborne/t_sigil_1/" +
        "l_Inscryption:ResizedSigils:bifurcated_strike/t_sigil_2/"
    );

    // It does not set additional sigils & renders warning to user
    await selectEvent.select(sigilsField, /Bifurcated Strike/);

    expect(
      screen.getByText(/Only 2 sigils can be applied at once./)
    ).toBeInTheDocument();

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedSigils:airborne/t_sigil_1/" +
        "l_Inscryption:ResizedSigils:bifurcated_strike/t_sigil_2/"
    );
  });

  it("removes the transformation when clear field is clicked", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedSigils:airborne/t_sigil/"
    );

    const removeButton = screen.getByRole("button", {
      name: "Remove Airborne",
    });
    userEvent.click(removeButton);

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });

  it("renders an option for each sigil", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    selectEvent.openMenu(sigilsField);

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
