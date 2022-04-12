import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Stats from "@form-fields/stats";

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
    it("ignores non-numerical characters", () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "Text");

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it("completely removes the transformation when field is empty", () => {
      const powerField = screen.getByRole("spinbutton", {
        name: /Power/,
      });

      userEvent.type(powerField, "9");

      expect(mockCallback).toHaveBeenLastCalledWith({ power: "9" });

      userEvent.type(powerField, "{selectall}{backspace}");

      expect(mockCallback).toHaveBeenLastCalledWith({});
    });
  });

  describe("the health number field", () => {
    it("ignores non-numerical characters", () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "Text");

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it("completely removes the transformation when field is empty", () => {
      const healthField = screen.getByRole("spinbutton", {
        name: /Health/,
      });

      userEvent.type(healthField, "9");

      expect(mockCallback).toHaveBeenLastCalledWith({ health: "9" });

      userEvent.type(healthField, "{selectall}{backspace}");

      expect(mockCallback).toHaveBeenLastCalledWith({});
    });
  });
});
