import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Overlays from "@form-fields/overlays";
import userEvent from "@testing-library/user-event";

describe("Overlays", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Overlays setOverlaysTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a checkbox for each overlay", () => {
    const blood1Field = screen.getByRole("checkbox", { name: /Blood \[1\]/ });
    const blood2Field = screen.getByRole("checkbox", { name: /Blood \[2\]/ });
    const fungusField = screen.getByRole("checkbox", { name: /Fungus/ });
    const gooField = screen.getByRole("checkbox", { name: /Goo/ });
    const smokeField = screen.getByRole("checkbox", { name: /Smoke/ });
    const stitchesField = screen.getByRole("checkbox", { name: /Stitches/ });

    expect(blood1Field).toBeInTheDocument();
    expect(blood2Field).toBeInTheDocument();
    expect(fungusField).toBeInTheDocument();
    expect(gooField).toBeInTheDocument();
    expect(smokeField).toBeInTheDocument();
    expect(stitchesField).toBeInTheDocument();
  });

  it("renders a flavourful description", () => {
    const overlaysFlavour = screen.getByText("...Or have any ?");
    const overlaysLabel = screen.getByText("overlays");

    expect(overlaysFlavour).toBeInTheDocument();
    expect(overlaysLabel).toBeInTheDocument();
  });

  it("correctly sets a transformation", () => {
    const blood1Field = screen.getByRole("checkbox", { name: /Blood \[1\]/ });

    userEvent.click(blood1Field);

    expect(mockCallback).toHaveBeenLastCalledWith({ overlays: ["blood_1"] });
  });

  it("correctly unsets specific transformations", () => {
    const blood1Field = screen.getByRole("checkbox", { name: /Blood \[1\]/ });
    const blood2Field = screen.getByRole("checkbox", { name: /Blood \[2\]/ });

    userEvent.click(blood1Field);

    expect(mockCallback).toHaveBeenLastCalledWith({ overlays: ["blood_1"] });

    userEvent.click(blood2Field);

    expect(mockCallback).toHaveBeenLastCalledWith({
      overlays: ["blood_1", "blood_2"],
    });

    userEvent.click(blood2Field);

    expect(mockCallback).toHaveBeenLastCalledWith({ overlays: ["blood_1"] });
  });

  it("removes the transformation when deselected", () => {
    const blood1Field = screen.getByRole("checkbox", { name: /Blood \[1\]/ });

    userEvent.click(blood1Field);

    expect(mockCallback).toHaveBeenLastCalledWith({ overlays: ["blood_1"] });

    userEvent.click(blood1Field);

    expect(mockCallback).toHaveBeenLastCalledWith({});
  });
});
