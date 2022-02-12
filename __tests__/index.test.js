import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as constants from "../components/constants";
import Home from "../pages";
import selectEvent from "react-select-event";

describe("Home", () => {
  constants.CLOUDINARY_IMAGE_BASE = "https://test/";

  beforeEach(async () => {
    render(<Home />);

    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("mocks the image url to avoid contacting cloudinary", async () => {
    const image = await screen.findByAltText("A preview of your custom card");

    expect(image.src).not.toContain("cloudinary");
    expect(image.src).toContain("test");
  });

  it("staggers changes across multiple fields", async () => {
    const image = await screen.findByAltText("A preview of your custom card");

    const nameField = screen.getByRole("textbox", {
      name: /Name/,
    });

    const powerField = screen.getByRole("spinbutton", {
      name: /Power/,
    });

    expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf/);

    await act(async () => {
      userEvent.type(nameField, "123456789");
    });

    jest.advanceTimersByTime(499);
    expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf/);

    // Make a change before timer runs out
    await act(async () => {
      userEvent.type(powerField, "123456789");
    });

    // Confirm that image does not change
    jest.advanceTimersByTime(499);
    expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf/);

    // Allow timer to finish
    await act(async () => {
      jest.advanceTimersByTime(2);
    });

    // Confirm image contains both transformations
    expect(image.src).toMatch(/HEAVYWEIGHT.ttf_128/);
    expect(image.src).toMatch(/HEAVYWEIGHT.ttf_204/);
  });

  describe("staggering individual form fields", () => {
    it("when name", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_128/);

      const nameField = screen.getByRole("textbox", {
        name: /Name/,
      });

      await act(async () => {
        userEvent.type(nameField, "123456789");
      });

      jest.advanceTimersByTime(499);
      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_128/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/HEAVYWEIGHT.ttf_128/);
    });

    it("when power", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_204/);

      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      await act(async () => {
        userEvent.type(powerField, "123456789");
      });

      jest.advanceTimersByTime(499);
      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_204/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/HEAVYWEIGHT.ttf_204/);
    });

    it("when health", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_204/);

      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      await act(async () => {
        userEvent.type(healthField, "123456789");
      });

      jest.advanceTimersByTime(499);
      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_204/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/HEAVYWEIGHT.ttf_204/);
    });

    it("when sigils", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/airborne/);

      const sigilsField = screen.getByRole("combobox", {
        "aria-label": /Sigils/,
      });

      await selectEvent.select(sigilsField, /Airborne/);

      jest.advanceTimersByTime(499);
      expect(image.src).not.toMatch(/airborne/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/airborne/);
    });
  });
});
