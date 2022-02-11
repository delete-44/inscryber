import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sigils from "../components/sigils";
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
});
