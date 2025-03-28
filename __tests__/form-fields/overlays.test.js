import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Overlays from "@form-fields/overlays";
import userEvent from "@testing-library/user-event";

describe("Overlays", () => {
  const mockCallback = jest.fn();

  describe("base functionality", () => {
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

  describe("when readonly", () => {
    beforeEach(() => {
      render(<Overlays setOverlaysTF={mockCallback} readonly />);
      jest.clearAllMocks();
    });

    it("hides checkboxes from screenreader", () => {
      let blood1Field = screen.queryByRole("checkbox", { name: /Blood \[1\]/ });
      let blood2Field = screen.queryByRole("checkbox", { name: /Blood \[2\]/ });
      let fungusField = screen.queryByRole("checkbox", { name: /Fungus/ });
      let gooField = screen.queryByRole("checkbox", { name: /Goo/ });
      let smokeField = screen.queryByRole("checkbox", { name: /Smoke/ });
      let stitchesField = screen.queryByRole("checkbox", { name: /Stitches/ });

      expect(blood1Field).toBeNull();
      expect(blood2Field).toBeNull();
      expect(fungusField).toBeNull();
      expect(gooField).toBeNull();
      expect(smokeField).toBeNull();
      expect(stitchesField).toBeNull();

      blood1Field = screen.getByRole("checkbox", {
        name: /Blood \[1\]/,
        hidden: true,
      });
      blood2Field = screen.getByRole("checkbox", {
        name: /Blood \[2\]/,
        hidden: true,
      });
      fungusField = screen.getByRole("checkbox", {
        name: /Fungus/,
        hidden: true,
      });
      gooField = screen.getByRole("checkbox", { name: /Goo/, hidden: true });
      smokeField = screen.getByRole("checkbox", {
        name: /Smoke/,
        hidden: true,
      });
      stitchesField = screen.getByRole("checkbox", {
        name: /Stitches/,
        hidden: true,
      });

      expect(blood1Field).toBeInTheDocument();
      expect(blood2Field).toBeInTheDocument();
      expect(fungusField).toBeInTheDocument();
      expect(gooField).toBeInTheDocument();
      expect(smokeField).toBeInTheDocument();
      expect(stitchesField).toBeInTheDocument();
    });

    it("prevents setting a transformation", () => {
      const blood1Field = screen.getByRole("checkbox", {
        name: /Blood \[1\]/,
        hidden: true,
      });

      userEvent.click(blood1Field);

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });
  });
});
