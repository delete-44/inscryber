import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as constants from "components/constants";
import Home from "pages/index";
import selectEvent from "react-select-event";

describe("Home", () => {
  constants.CLOUDINARY_BASE = "https://test/";

  beforeEach(async () => {
    render(<Home />);

    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders basic page layout", async () => {
    const h1 = screen.getByRole("heading", { name: "Inscryber" });
    const image = await screen.findByAltText("A preview of your custom card");
    const imageDownloadLink = screen.getByRole("link", {
      name: "Download Image",
    });

    expect(h1).toBeInTheDocument();
    expect(image).toBeInTheDocument();

    expect(imageDownloadLink).toBeInTheDocument();
    expect(imageDownloadLink).toHaveAttribute(
      "href",
      `${constants.CLOUDINARY_BASE}c_scale,h_${constants.CARD_HEIGHT},w_${constants.CARD_WIDTH}/${constants.CARD_BASE}blur`
    );
  });

  it("mocks the image url to avoid contacting cloudinary", async () => {
    const image = await screen.findByAltText("A preview of your custom card");

    expect(image.src).not.toContain("cloudinary");
    expect(image.src).toContain("test");
  });

  it("keeps download link in sync with changes", async () => {
    const image = await screen.findByAltText("A preview of your custom card");
    const imageDownloadLink = screen.getByRole("link", {
      name: "Download Image",
    });
    const nameField = screen.getByRole("textbox", { name: /Name/ });

    expect(image.src).not.toMatch(/t_name_short/);
    expect(image.src).toMatch(/fl_attachment%3Ainscryber-card/);

    expect(imageDownloadLink.href).not.toMatch(/t_name_short/);
    expect(imageDownloadLink.href).toMatch(/fl_attachment:inscryber-card/);

    await act(async () => {
      userEvent.type(nameField, "123456789");
      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER + 1);
    });

    expect(image.src).toMatch(/t_name_short/);
    expect(image.src).toMatch(/fl_attachment%3Ainscryber-card/);

    expect(imageDownloadLink.href).toMatch(/t_name_short/);
    expect(imageDownloadLink.href).toMatch(/fl_attachment:inscryber-card/);
  });

  it("staggers changes across multiple fields", async () => {
    const image = await screen.findByAltText("A preview of your custom card");

    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    const powerField = screen.getByRole("spinbutton", {
      name: /Power/,
    });

    expect(image.src).not.toMatch(/t_name_short/);
    expect(image.src).not.toMatch(/t_power/);

    await act(async () => {
      userEvent.type(nameField, "123456789");
    });

    jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);

    expect(image.src).not.toMatch(/t_name_short/);
    expect(image.src).not.toMatch(/t_power/);

    // Make a change before timer runs out
    await act(async () => {
      userEvent.type(powerField, "123456789");
    });

    // Confirm that image does not change
    jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);

    expect(image.src).not.toMatch(/t_name_short/);
    expect(image.src).not.toMatch(/t_power/);

    // Allow timer to finish
    await act(async () => {
      jest.advanceTimersByTime(2);
    });

    // Confirm image contains both transformations
    expect(image.src).toMatch(/t_name_short/);
    expect(image.src).toMatch(/t_power/);
  });

  describe("staggering individual form fields", () => {
    it("when name", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_name_short/);

      const nameField = screen.getByRole("textbox", {
        name: /Name/,
      });

      await act(async () => {
        userEvent.type(nameField, "123456789");
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_name_short/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_name_short/);
    });

    it("when power", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_power/);

      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      await act(async () => {
        userEvent.type(powerField, "123456789");
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_power/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_power/);
    });

    it("when health", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_health/);

      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      await act(async () => {
        userEvent.type(healthField, "123456789");
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_health/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_health/);
    });

    it("when cost", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_cost/);

      const costField = screen.getByRole("spinbutton", { name: /Cost/ });

      userEvent.type(costField, "1");

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_cost/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_cost/);
    });

    it("when sigils", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_sigil/);

      const sigilsField = screen.getAllByRole("combobox", {
        "aria-label": /Sigils/,
      })[0];

      await selectEvent.select(sigilsField, /Airborne/);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_sigil/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_sigil/);
    });

    it("when patches", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_patch_1/);

      const patchesField = screen.getAllByRole("combobox", {
        "aria-label": /Patches/,
      })[1];

      await selectEvent.select(patchesField, /Airborne/);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_patch_1/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_patch_1/);
    });

    it("when tribes", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_tribe_1/);

      const birdTribe = screen.getByRole("checkbox", { name: /Bird/ });

      userEvent.click(birdTribe);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_tribe_1/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_tribe_1/);
    });

    it("when card bases", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/rare/);

      const rareRadio = screen.getByRole("radio", { name: /Rare/ });

      userEvent.click(rareRadio);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/rare/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/rare/);
    });

    it("when portrait", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          public_id: "fake/image/returned",
        })
      );

      const testFile = new File(["Test"], "test.png", { type: "image/png" });
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_portrait/);

      const fileField = screen.getByLabelText("portrait");

      await act(async () => {
        userEvent.upload(fileField, testFile);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_portrait/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_portrait/);
    });

    it("when inscrybed portrait", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          public_id: "fake/image/returned",
        })
      );

      const testFile = new File(["Test"], "test.png", { type: "image/png" });
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/t_bleach_colour/);

      const fileField = screen.getByLabelText("portrait");

      await act(async () => {
        userEvent.upload(fileField, testFile);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/t_bleach_colour/);

      const bleachCheck = screen.getByRole("checkbox", {
        name: /Bleach Colour/,
      });

      userEvent.click(bleachCheck);

      await act(async () => {
        jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      });

      expect(image.src).not.toMatch(/t_bleach_colour/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/t_bleach_colour/);
    });
  });
});
