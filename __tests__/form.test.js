import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as constants from "components/constants";
import Form from "components/form";
import selectEvent from "react-select-event";

describe("Form", () => {
  constants.CLOUDINARY_BASE = "https://test/";

  beforeEach(async () => {
    render(<Form />);

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

    const birdTribe = screen.getAllByRole("checkbox", {
      name: /Bird/,
    })[0];

    const rareCardBack = screen.getAllByRole("radio")[1];

    const portrait = screen.getByLabelText("portrait");

    expect(name).toBeInTheDocument();
    expect(power).toBeInTheDocument();
    expect(health).toBeInTheDocument();
    expect(sigils).toBeInTheDocument();
    expect(patches).toBeInTheDocument();
    expect(birdTribe).toBeInTheDocument();
    expect(rareCardBack).toBeInTheDocument();
    expect(portrait).toBeInTheDocument();
  });
});
