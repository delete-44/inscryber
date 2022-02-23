import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inscryber from "components/files/inscryber";
import userEvent from "@testing-library/user-event";

describe("Inscryber", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders inscryber checkbox with associated label", () => {
    render(<Inscryber setInscrybed={mockCallback} />);

    const inscryberCheck = screen.getByRole("checkbox", {
      name: "Inscrybe Image",
    });

    expect(inscryberCheck).toBeInTheDocument();
    expect(inscryberCheck).not.toBeChecked();
  });

  it("sets & unsets checkbox", () => {
    const { rerender } = render(
      <Inscryber setInscrybed={mockCallback} inscrybed={false} />
    );

    const inscryberCheck = screen.getByRole("checkbox", {
      name: "Inscrybe Image",
    });

    expect(inscryberCheck).not.toBeChecked();
    expect(mockCallback).toHaveBeenCalledTimes(0);

    userEvent.click(inscryberCheck);

    rerender(<Inscryber setInscrybed={mockCallback} inscrybed />);

    expect(inscryberCheck).toBeChecked();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(true);
  });
});
