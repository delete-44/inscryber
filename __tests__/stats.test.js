import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Stats from "../components/stats";
import { HEAVYWEIGHT } from "../components/constants";

describe("Stats", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Stats setPowerTF={mockCallback} />);
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
          `l_text:${HEAVYWEIGHT}_156:9,g_south_west,x_64,y_164,w_100,h_156,c_fit/`
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
          `l_text:${HEAVYWEIGHT}_156:10,g_south_west,x_64,y_164,w_100,h_156,c_scale/`
        );
      });
    });
  });
});
