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
    const imageHelpText = screen.getByText(
      /To download this image, right click \(or long press on mobile devices\) and select "Save Image As"./
    );

    expect(h1).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(imageHelpText).toBeInTheDocument();
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

    jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
    expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf/);

    // Make a change before timer runs out
    await act(async () => {
      userEvent.type(powerField, "123456789");
    });

    // Confirm that image does not change
    jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
    expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf/);

    // Allow timer to finish
    await act(async () => {
      jest.advanceTimersByTime(2);
    });

    // Confirm image contains both transformations
    expect(image.src).toMatch(/HEAVYWEIGHT.ttf_128/);
    expect(image.src).toMatch(/HEAVYWEIGHT.ttf_196/);
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

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_128/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/HEAVYWEIGHT.ttf_128/);
    });

    it("when power", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_196/);

      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      await act(async () => {
        userEvent.type(powerField, "123456789");
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_196/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/HEAVYWEIGHT.ttf_196/);
    });

    it("when health", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_196/);

      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      await act(async () => {
        userEvent.type(healthField, "123456789");
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/HEAVYWEIGHT.ttf_196/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/HEAVYWEIGHT.ttf_196/);
    });

    it("when sigils", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/airborne/);

      const sigilsField = screen.getAllByRole("combobox", {
        "aria-label": /Sigils/,
      })[0];

      await selectEvent.select(sigilsField, /Airborne/);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/airborne/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/airborne/);
    });

    it("when patches", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/stinky/);

      const patchesField = screen.getAllByRole("combobox", {
        "aria-label": /Patches/,
      })[0];

      await selectEvent.select(patchesField, /Stinky/);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/stinky/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/stinky/);
    });

    it("when tribes", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/bird/);

      const birdTribe = screen.getByRole("checkbox", { name: /Bird/ });

      userEvent.click(birdTribe);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/bird/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/bird/);
    });

    it("when card bases", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/rare/);

      const rareRadio = screen.getAllByRole("radio")[1];

      userEvent.click(rareRadio);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/rare/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/rare/);
    });

    it("when cost", async () => {
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/blood/);

      const costSelector = screen.getAllByRole("combobox", {
        "aria-label": /Cost/,
      })[2];

      await selectEvent.select(costSelector, /1 Blood/);

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/blood/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/blood/);
    });

    it("when portrait", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          public_id: "fake/image/returned",
        })
      );

      const testFile = new File(["Test"], "test.png", { type: "image/png" });
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/test%2Fl_fake%3Aimage%3Areturned/);

      const fileField = screen.getByLabelText("portrait");

      await act(async () => {
        userEvent.upload(fileField, testFile);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/test%2Fl_fake%3Aimage%3Areturned/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/test%2Fl_fake%3Aimage%3Areturned/);
    });

    it("when inscrybed portrait", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          public_id: "fake/image/returned",
        })
      );

      const testFile = new File(["Test"], "test.png", { type: "image/png" });
      const image = await screen.findByAltText("A preview of your custom card");

      expect(image.src).not.toMatch(/test%2Fl_fake%3Aimage%3Areturned/);

      const fileField = screen.getByLabelText("portrait");

      await act(async () => {
        userEvent.upload(fileField, testFile);
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });

      jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      expect(image.src).not.toMatch(/test%2Fl_fake%3Aimage%3Areturned/);

      const inscryberCheck = screen.getByRole("checkbox", {
        name: "Inscrybe Image",
      });

      userEvent.click(inscryberCheck);

      await act(async () => {
        jest.advanceTimersByTime(constants.DEBOUNCE_TIMER - 1);
      });

      expect(image.src).not.toMatch(/test%2Fl_fake%3Aimage%3Areturned/);

      await act(async () => {
        jest.advanceTimersByTime(2);
      });

      expect(image.src).toMatch(/test%2Fl_fake%3Aimage%3Areturned/);
    });
  });
});
