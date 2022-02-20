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

  describe("getWidth function", () => {
    it("sets width at 50 for the character '1'", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "1");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_196:1,g_south_west,x_72,y_156,c_scale,w_50/`
        );
      });
    });

    it("sets width at 65 for numbers 2-9", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "2");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_196:2,g_south_west,x_72,y_156,c_scale,w_65/`
        );
      });
    })

    it("sets width at 80 for the characters 10 to 99", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "10");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_196:10,g_south_west,x_72,y_156,c_scale,w_80/`
        );
      });

      userEvent.type(powerField, "{selectall}{backspace}");
      userEvent.type(powerField, "99");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_196:99,g_south_west,x_72,y_156,c_scale,w_80/`
        );
      });
    });

    it("expands width for larger numbers", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "100");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith(
          `l_text:${HEAVYWEIGHT}_196:100,g_south_west,x_72,y_156,c_scale,w_100/`
        );
      });
    });
  });

  describe("the power number field", () => {
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
          `l_text:${HEAVYWEIGHT}_196:9,g_south_west,x_72,y_156,c_scale,w_65/`
        );
      });

      userEvent.type(powerField, "{selectall}{backspace}");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith("");
      });
    });
  });

  describe("the health number field", () => {
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
          `l_text:${HEAVYWEIGHT}_196:9,g_south_east,x_60,y_86,c_scale,w_65/`
        );
      });

      userEvent.type(healthField, "{selectall}{backspace}");

      await waitFor(() => {
        expect(mockCallback).toHaveBeenCalledWith("");
      });
    });
  });
});
