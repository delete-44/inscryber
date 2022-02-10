import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as constants from "../components/constants";
import Home from "../pages";

describe("Name", () => {
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

  it("mocks the image url to avoid contacting cloudinary", async () => {
    const image = await screen.findByAltText(
      "A blank card with the 'Stinky' sigil"
    );

    expect(image.src).not.toContain("cloudinary");
    expect(image.src).toContain("test");
  });

  it("staggers changes across multiple fields", async () => {});

  describe("staggering individual form fields", () => {
    it("when name", async () => {
      const image = await screen.findByAltText(
        "A blank card with the 'Stinky' sigil"
      );

      expect(image.src).not.toContain("HEAVYWEIGHT.ttf_128");

      const nameField = screen.getByRole("textbox", {
        name: /Name/,
      });

      await act(async () => {
        userEvent.type(nameField, "123456789");
      });

      jest.advanceTimersByTime(499);
      expect(image.src).not.toContain("HEAVYWEIGHT.ttf_128");

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toContain("HEAVYWEIGHT.ttf_128");
    });

    it("when power", async () => {
      const image = await screen.findByAltText(
        "A blank card with the 'Stinky' sigil"
      );

      expect(image.src).not.toContain("HEAVYWEIGHT.ttf_156");

      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      await act(async () => {
        userEvent.type(powerField, "123456789");
      });

      jest.advanceTimersByTime(499);
      expect(image.src).not.toContain("HEAVYWEIGHT.ttf_156");

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toContain("HEAVYWEIGHT.ttf_156");
    });

    it("when health", async () => {
      const image = await screen.findByAltText(
        "A blank card with the 'Stinky' sigil"
      );

      expect(image.src).not.toContain("HEAVYWEIGHT.ttf_156");

      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      await act(async () => {
        userEvent.type(healthField, "123456789");
      });

      jest.advanceTimersByTime(499);
      expect(image.src).not.toContain("HEAVYWEIGHT.ttf_156");

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toContain("HEAVYWEIGHT.ttf_156");
    });
  });
});
