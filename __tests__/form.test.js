import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as constants from "components/constants";
import Form from "components/form";

jest.mock("components/constants", () => {
  return {
    ...jest.requireActual("components/constants"),
    CLOUDINARY_BASE: "https://test/"
  };
});

describe("Form", () => {
  const mockSetBusy = jest.fn();
  const mockSetUrl = jest.fn();
  const mockSetCardBase = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("when default base card", () => {
    beforeEach(() => {
      render(
        <Form
          setBusy={mockSetBusy}
          setUrl={mockSetUrl}
          setCardBase={mockSetCardBase}
          cardBase="vladde"
        />
      );
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
      })[1];

      const birdTribe = screen.getByRole("checkbox", { name: /Bird/ });

      const gooOverlay = screen.getByRole("checkbox", { name: /Goo/ });

      const rareCardBack = screen.getByRole("radio", { name: /Rare/ });

      const cost = screen.getByRole("spinbutton", { name: /Cost/ });

      const portrait = screen.getByLabelText("portrait");

      expect(name).toBeInTheDocument();
      expect(power).toBeInTheDocument();
      expect(health).toBeInTheDocument();
      expect(sigils).toBeInTheDocument();
      expect(patches).toBeInTheDocument();
      expect(birdTribe).toBeInTheDocument();
      expect(gooOverlay).toBeInTheDocument();
      expect(rareCardBack).toBeInTheDocument();
      expect(cost).toBeInTheDocument();
      expect(portrait).toBeInTheDocument();
    });

    xit("staggers changes across multiple fields", async () => {
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
          "l_text:Inscryber:HEAVYWEIGHT.ttf_128_center:9/t_name_short/" +
          "l_text:Inscryber:HEAVYWEIGHT.ttf_196:123456789,c_scale,w_100/t_power/" +
          "fl_attachment:inscryber-card/Inscryber/blank_vladde"
      );
      expect(mockSetBusy).toBeCalledWith(true);
    });
  });

  describe("when po3 base card", () => {
    beforeEach(async () => {
      render(
        <Form
          setBusy={mockSetBusy}
          setUrl={mockSetUrl}
          setCardBase={mockSetCardBase}
          cardBase="botopia"
        />
      );
    });

    it("makes certain form fields readonly", async () => {
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

      let patches = screen.getAllByRole("combobox", {
        "aria-label": /Patches/,
      })[1];

      let birdTribe = screen.queryByRole("checkbox", { name: /Bird/ });

      let gooOverlay = screen.queryByRole("checkbox", { name: /Goo/ });

      const rareCardBack = screen.getByRole("radio", { name: /Rare/ });

      const cost = screen.getByRole("spinbutton", { name: /Cost/ });

      const portrait = screen.getByLabelText("portrait");

      expect(name).toBeInTheDocument();
      expect(power).toBeInTheDocument();
      expect(health).toBeInTheDocument();
      expect(sigils).toBeInTheDocument();
      expect(patches).toBeUndefined();
      expect(birdTribe).toBeNull();
      expect(gooOverlay).toBeNull();
      expect(rareCardBack).toBeInTheDocument();
      expect(cost).toBeInTheDocument();
      expect(portrait).toBeInTheDocument();

      patches = screen.getAllByRole("combobox", {
        "aria-label": /Patches/,
        hidden: true,
      })[1];

      birdTribe = screen.getByRole("checkbox", { name: /Bird/, hidden: true });

      gooOverlay = screen.getByRole("checkbox", { name: /Goo/, hidden: true });

      expect(patches).toBeInTheDocument();
      expect(birdTribe).toBeInTheDocument();
      expect(gooOverlay).toBeInTheDocument();
    });
  });
});
