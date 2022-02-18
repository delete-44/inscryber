import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Stats from "@form-fields/stats";
import { HEAVYWEIGHT } from "components/constants";

describe("Stats", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Stats setPowerTF={mockCallback} setHealthTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders text box for both stats", () => {
    const powerField = screen.getByRole("spinbutton", {
      name: /Power/,
    });

    const healthField = screen.getByRole("spinbutton", {
      name: /Health/,
    });

    expect(powerField).toBeInTheDocument();
    expect(powerField).toHaveTextContent("");

    expect(healthField).toBeInTheDocument();
    expect(healthField).toHaveTextContent("");
  });

  it("renders a flavourful description", () => {
    const flavour = screen.getByText("How about their and ?");
    const powerLabel = screen.getByText("power");
    const healthLabel = screen.getByText("health");

    expect(flavour).toBeInTheDocument();
    expect(powerLabel).toBeInTheDocument();
    expect(healthLabel).toBeInTheDocument();
  });

  describe("the power number field", () => {
    it("uses fit cropping for numbers < 10", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "9");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_204:9,g_south_west,x_72,y_164,w_100,h_156,c_fit/`
        );
      });
    });

    it("uses scale cropping for numbers >= 10", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "10");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_204:10,g_south_west,x_72,y_164,w_100,h_156,c_scale/`
        );
      });
    });

    it("ignores non-numerical characters", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "Text");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledTimes(0);
      });
    });

    it("completely removes the transformation when field is empty", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "9");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_204:9,g_south_west,x_72,y_164,w_100,h_156,c_fit/`
        );
      });

      userEvent.type(powerField, "{selectall}{backspace}");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith("");
      });
    });
  });

  describe("the health number field", () => {
    it("uses fit cropping for numbers < 10", async () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "9");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_204:9,g_south_east,x_60,y_66,w_100,h_156,c_fit/`
        );
      });
    });

    it("uses scale cropping for numbers >= 10", async () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "10");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_204:10,g_south_east,x_60,y_66,w_100,h_156,c_scale/`
        );
      });
    });

    it("ignores non-numerical characters", async () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "Text");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledTimes(0);
      });
    });

    it("completely removes the transformation when field is empty", async () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "9");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_204:9,g_south_east,x_60,y_66,w_100,h_156,c_fit/`
        );
      });

      userEvent.type(healthField, "{selectall}{backspace}");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith("");
      });
    });
  });
});
