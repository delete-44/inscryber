import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as constants from "components/constants";
import Form from "components/form";

describe("Form", () => {
  const mockSetBusy = jest.fn();
  const mockSetUrl = jest.fn();

  constants.CLOUDINARY_BASE = "https://test/";

  beforeEach(async () => {
    render(<Form setBusy={mockSetBusy} setUrl={mockSetUrl} />);

    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders each form field", async () => {
    const name = screen.getByRole("textbox", {
      name: /Name/,
    });

    const power = screen.getByRole("spinbutton", {
      name: /Power/,
    });

    const health = screen.getByRole("spinbutton", {
      name: /Health/,
    });

    const sigils = screen.getAllByRole("combobox", {
      "aria-label": /Sigils/,
    })[0];

    const patches = screen.getAllByRole("combobox", {
      "aria-label": /Patches/,
    })[0];

    const birdTribe = screen.getByRole("checkbox", { name: /Bird/ });

    const rareCardBack = screen.getAllByRole("radio")[1];

    const cost = screen.getAllByRole("combobox", {
      "aria-label": /Cost/,
    })[0];

    const portrait = screen.getByLabelText("portrait");

    expect(name).toBeInTheDocument();
    expect(power).toBeInTheDocument();
    expect(health).toBeInTheDocument();
    expect(sigils).toBeInTheDocument();
    expect(patches).toBeInTheDocument();
    expect(birdTribe).toBeInTheDocument();
    expect(rareCardBack).toBeInTheDocument();
    expect(cost).toBeInTheDocument();
    expect(portrait).toBeInTheDocument();
  });

  it("staggers changes across multiple fields", async () => {
    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    const powerField = screen.getByRole("spinbutton", {
      name: /Power/,
    });

    expect(mockSetUrl).not.toHaveBeenCalled();
    expect(mockSetBusy).not.toHaveBeenCalled();

    await act(async () => {
      userEvent.type(nameField, "123456789");
    });

    jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);

    expect(mockSetUrl).not.toHaveBeenCalled();
    expect(mockSetBusy).not.toHaveBeenCalled();

    // Make a change before timer runs out
    await act(async () => {
      userEvent.type(powerField, "123456789");
    });

    expect(mockSetUrl).not.toHaveBeenCalled();
    expect(mockSetBusy).not.toHaveBeenCalled();

    // Allow timer to finish
    await act(async () => {
      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER + 2);
    });

    // Confirm image contains both transformations
    expect(mockSetUrl).toHaveBeenLastCalledWith(
      "https://test/" +
        "l_text:Inscryption:VICIOUSHUNGER.ttf_128:9,w_560,h_115,c_fit/fl_layer_apply,y_48,g_north/" +
        "l_text:Inscryption:HEAVYWEIGHT.ttf_196:123456789,c_scale,w_100/fl_layer_apply,g_south_west,x_72,y_156/" +
        "Inscryption/blank_vladde"
    );
    expect(mockSetBusy).toBeCalledWith(true);
  });
});
