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
      "l_Inscryber:Sigils:v1:airborne/t_sigil/"
    );
  });

  it("correctly sets multiple transformations", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Sigils:v1:airborne/t_sigil/"
    );

    await selectEvent.select(sigilsField, /Bifurcated Strike/);

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Sigils:v1:airborne/t_v1_sigil_1/" +
        "l_Inscryber:Sigils:v1:bifurcated_strike/t_v1_sigil_2/"
    );

    // It does not set additional sigils & renders warning to user
    await selectEvent.select(sigilsField, /Bifurcated Strike/);

    expect(
      screen.getByText(/Only 2 sigils can be applied at once./)
    ).toBeInTheDocument();

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Sigils:v1:airborne/t_v1_sigil_1/" +
        "l_Inscryber:Sigils:v1:bifurcated_strike/t_v1_sigil_2/"
    );
  });

  it("removes the transformation when clear field is clicked", async () => {
    const sigilsField = screen.getByRole("combobox", {
      "aria-label": /Sigils/,
    });

    await selectEvent.select(sigilsField, /Airborne/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Sigils:v1:airborne/t_sigil/"
    );

    const removeButton = screen.getByRole("button", {
      name: "Remove Airborne",
    });
    userEvent.click(removeButton);

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });
});
