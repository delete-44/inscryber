import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tribes from "@form-fields/tribes";
import selectEvent from "react-select-event";
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
});
