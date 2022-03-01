import { render, screen } from "@testing-library/react";
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

      expect(mockCallback).toHaveBeenLastCalledWith(
        `l_text:${HEAVYWEIGHT}_196:1,c_scale,w_50/fl_layer_apply,g_south_west,x_72,y_156/`
      );
    });

    it("sets width at 65 for numbers 2-9", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "2");

      expect(mockCallback).toHaveBeenLastCalledWith(
        `l_text:${HEAVYWEIGHT}_196:2,c_scale,w_65/fl_layer_apply,g_south_west,x_72,y_156/`
      );
    });

    it("sets width at 80 for the characters 10 to 99", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "10");

      expect(mockCallback).toHaveBeenLastCalledWith(
        `l_text:${HEAVYWEIGHT}_196:10,c_scale,w_80/fl_layer_apply,g_south_west,x_72,y_156/`
      );

      userEvent.type(powerField, "{selectall}{backspace}");
      userEvent.type(powerField, "99");

      expect(mockCallback).toHaveBeenLastCalledWith(
        `l_text:${HEAVYWEIGHT}_196:99,c_scale,w_80/fl_layer_apply,g_south_west,x_72,y_156/`
      );
    });

    it("expands width for larger numbers", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "100");

      expect(mockCallback).toHaveBeenLastCalledWith(
        `l_text:${HEAVYWEIGHT}_196:100,c_scale,w_100/fl_layer_apply,g_south_west,x_72,y_156/`
      );
    });
  });

  describe("the power number field", () => {
    it("ignores non-numerical characters", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "Text");

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it("completely removes the transformation when field is empty", async () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "9");

      expect(mockCallback).toHaveBeenLastCalledWith(
        `l_text:${HEAVYWEIGHT}_196:9,c_scale,w_65/fl_layer_apply,g_south_west,x_72,y_156/`
      );

      userEvent.type(powerField, "{selectall}{backspace}");

      expect(mockCallback).toHaveBeenLastCalledWith("");
    });
  });

  describe("the health number field", () => {
    it("ignores non-numerical characters", async () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "Text");

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it("completely removes the transformation when field is empty", async () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "9");

      expect(mockCallback).toHaveBeenLastCalledWith(
        `l_text:${HEAVYWEIGHT}_196:9,c_scale,w_65/fl_layer_apply,g_south_east,x_60,y_86/`
      );

      userEvent.type(healthField, "{selectall}{backspace}");

      expect(mockCallback).toHaveBeenLastCalledWith("");
    });
  });
});
