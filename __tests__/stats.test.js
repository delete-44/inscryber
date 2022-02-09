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
      name: /Health/
    })

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
});
