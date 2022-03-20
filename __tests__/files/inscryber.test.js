import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inscryber from "components/files/inscryber";
import userEvent from "@testing-library/user-event";

describe("Inscryber", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Inscryber setInscrybedTFs={mockCallback} />);

    jest.clearAllMocks();
  });

  it("renders a checkbox for each manipulation", () => {
    const bleachField = screen.getByRole("checkbox", { name: /Bleach Colour/ });
    const distortField = screen.getByRole("checkbox", {
      name: /Distort Edges/,
    });
    const removeBGField = screen.getByRole("checkbox", {
      name: /Remove Background/,
    });

    expect(bleachField).toBeInTheDocument();
    expect(distortField).toBeInTheDocument();
    expect(removeBGField).toBeInTheDocument();
  });

  it("correctly sets a transformation", () => {
    const bleachField = screen.getByRole("checkbox", { name: /Bleach Colour/ });

    userEvent.click(bleachField);

    expect(mockCallback).toHaveBeenLastCalledWith("t_bleach_colour/");
  });

  it("correctly unsets specific transformations", () => {
    const bleachField = screen.getByRole("checkbox", { name: /Bleach Colour/ });
    const distortField = screen.getByRole("checkbox", {
      name: /Distort Edges/,
    });

    userEvent.click(bleachField);

    expect(mockCallback).toHaveBeenLastCalledWith("t_bleach_colour/");

    userEvent.click(distortField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_bleach_colour/t_distort_edges/"
    );

    userEvent.click(distortField);

    expect(mockCallback).toHaveBeenLastCalledWith("t_bleach_colour/");
  });

  it("correctly sets all transformations when all selected", () => {
    const bleachField = screen.getByRole("checkbox", { name: /Bleach Colour/ });
    const distortField = screen.getByRole("checkbox", {
      name: /Distort Edges/,
    });
    const removeBGField = screen.getByRole("checkbox", {
      name: /Remove Background/,
    });

    userEvent.click(bleachField);
    userEvent.click(distortField);
    userEvent.click(removeBGField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_bleach_colour/t_distort_edges/t_remove_background/"
    );
  });

  it("removes the transformation when all transformations deselected", () => {
    const bleachField = screen.getByRole("checkbox", { name: /Bleach Colour/ });
    const distortField = screen.getByRole("checkbox", {
      name: /Distort Edges/,
    });
    const removeBGField = screen.getByRole("checkbox", {
      name: /Remove Background/,
    });

    userEvent.click(distortField);

    expect(mockCallback).toHaveBeenLastCalledWith("t_distort_edges/");

    userEvent.click(bleachField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_bleach_colour/t_distort_edges/"
    );

    userEvent.click(removeBGField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_bleach_colour/t_distort_edges/t_remove_background/"
    );

    userEvent.click(bleachField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_distort_edges/t_remove_background/"
    );

    userEvent.click(distortField);
    userEvent.click(removeBGField);

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });
});
