import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tribes from "@form-fields/tribes";
import userEvent from "@testing-library/user-event";

describe("Tribes", () => {
  const mockCallback = jest.fn();

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
    const tribesFlavour = screen.getByText(
      "Does this creature belong to any ?"
    );
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
