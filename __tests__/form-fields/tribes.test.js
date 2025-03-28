import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tribes from "@form-fields/tribes";
import userEvent from "@testing-library/user-event";

describe("Tribes", () => {
  const mockCallback = jest.fn();

  describe("base functionality", () => {
    beforeEach(() => {
      render(<Tribes setTribesTF={mockCallback} />);
      jest.clearAllMocks();
    });

    it("renders a checkbox for each tribe", () => {
      const birdField = screen.getByRole("checkbox", { name: /Bird/ });
      const canineField = screen.getByRole("checkbox", { name: /Canine/ });
      const hoovedField = screen.getByRole("checkbox", { name: /Hooved/ });
      const insectField = screen.getByRole("checkbox", { name: /Insect/ });
      const reptileField = screen.getByRole("checkbox", { name: /Reptile/ });

      expect(birdField).toBeInTheDocument();
      expect(canineField).toBeInTheDocument();
      expect(hoovedField).toBeInTheDocument();
      expect(insectField).toBeInTheDocument();
      expect(reptileField).toBeInTheDocument();
    });

    it("renders a flavourful description", () => {
      const tribesFlavour = screen.getByText("Does it belong to any ?");
      const tribesLabel = screen.getByText("tribes");

      expect(tribesFlavour).toBeInTheDocument();
      expect(tribesLabel).toBeInTheDocument();
    });

    it("correctly sets a transformation", () => {
      const birdField = screen.getByRole("checkbox", { name: /Bird/ });

      userEvent.click(birdField);

      expect(mockCallback).toHaveBeenLastCalledWith({ tribes: ["bird"] });
    });

    it("correctly unsets specific transformations", () => {
      const birdField = screen.getByRole("checkbox", { name: /Bird/ });
      const canineField = screen.getByRole("checkbox", { name: /Canine/ });

      userEvent.click(birdField);

      expect(mockCallback).toHaveBeenLastCalledWith({ tribes: ["bird"] });

      userEvent.click(canineField);

      expect(mockCallback).toHaveBeenLastCalledWith({
        tribes: ["bird", "canine"],
      });

      userEvent.click(canineField);

      expect(mockCallback).toHaveBeenLastCalledWith({ tribes: ["bird"] });
    });

    it("removes the transformation when deselected", () => {
      const birdField = screen.getByRole("checkbox", { name: /Bird/ });

      userEvent.click(birdField);

      expect(mockCallback).toHaveBeenLastCalledWith({ tribes: ["bird"] });

      userEvent.click(birdField);

      expect(mockCallback).toHaveBeenLastCalledWith({});
    });
  });

  describe("when readonly", () => {
    beforeEach(() => {
      render(<Tribes setTribesTF={mockCallback} readonly />);
      jest.clearAllMocks();
    });

    it("hides checkboxes from screenreader", () => {
      let birdField = screen.queryByRole("checkbox", { name: /Bird/ });
      let canineField = screen.queryByRole("checkbox", { name: /Canine/ });
      let hoovedField = screen.queryByRole("checkbox", { name: /Hooved/ });
      let insectField = screen.queryByRole("checkbox", { name: /Insect/ });
      let reptileField = screen.queryByRole("checkbox", { name: /Reptile/ });

      expect(birdField).toBeNull();
      expect(canineField).toBeNull();
      expect(hoovedField).toBeNull();
      expect(insectField).toBeNull();
      expect(reptileField).toBeNull();

      birdField = screen.getByRole("checkbox", { name: /Bird/, hidden: true });
      canineField = screen.getByRole("checkbox", {
        name: /Canine/,
        hidden: true,
      });
      hoovedField = screen.getByRole("checkbox", {
        name: /Hooved/,
        hidden: true,
      });
      insectField = screen.getByRole("checkbox", {
        name: /Insect/,
        hidden: true,
      });
      reptileField = screen.getByRole("checkbox", {
        name: /Reptile/,
        hidden: true,
      });

      expect(birdField).toBeInTheDocument();
      expect(canineField).toBeInTheDocument();
      expect(hoovedField).toBeInTheDocument();
      expect(insectField).toBeInTheDocument();
      expect(reptileField).toBeInTheDocument();
    });

    it("prevents setting a transformation", () => {
      const birdField = screen.queryByRole("checkbox", {
        name: /Bird/,
        hidden: true,
      });

      userEvent.click(birdField);

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });
  });
});
