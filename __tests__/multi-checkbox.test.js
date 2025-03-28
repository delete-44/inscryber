import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiCheckbox from "components/multi-checkbox";
import userEvent from "@testing-library/user-event";

describe("MultiCheckbox", () => {
  const mockCallback = jest.fn();
  const formName = "test-multi-checkbox";
  const options = [
    { filename: "test-checkbox-1", label: "Checkbox 1" },
    { filename: "test-checkbox-2", label: "Checkbox 2" },
    { filename: "test-checkbox-3", label: "Checkbox 3" },
  ];

  beforeEach(() => {
    render(
      <MultiCheckbox
        setSelectedFilenames={mockCallback}
        formName={formName}
        options={options}
      />
    );

    jest.clearAllMocks();
  });

  it("renders a checkbox for each option", () => {
    const checkOne = screen.getByRole("checkbox", { name: /Checkbox 1/ });
    const checkTwo = screen.getByRole("checkbox", { name: /Checkbox 2/ });
    const checkThree = screen.getByRole("checkbox", { name: /Checkbox 3/ });

    expect(checkOne).toBeInTheDocument();
    expect(checkTwo).toBeInTheDocument();
    expect(checkThree).toBeInTheDocument();
  });

  it("correctly sets a selected filename", () => {
    const checkOne = screen.getByRole("checkbox", { name: /Checkbox 1/ });

    userEvent.click(checkOne);

    expect(mockCallback).toHaveBeenLastCalledWith(["test-checkbox-1"]);
  });

  it("correctly unsets specific filenames", () => {
    const checkOne = screen.getByRole("checkbox", { name: /Checkbox 1/ });
    const checkTwo = screen.getByRole("checkbox", { name: /Checkbox 2/ });

    userEvent.click(checkOne);

    expect(mockCallback).toHaveBeenLastCalledWith(["test-checkbox-1"]);

    userEvent.click(checkTwo);

    expect(mockCallback).toHaveBeenLastCalledWith([
      "test-checkbox-1",
      "test-checkbox-2",
    ]);

    userEvent.click(checkTwo);

    expect(mockCallback).toHaveBeenLastCalledWith(["test-checkbox-1"]);
  });

  it("sorts selected values alphabetically regardless of selection order", () => {
    const checkOne = screen.getByRole("checkbox", { name: /Checkbox 1/ });
    const checkTwo = screen.getByRole("checkbox", { name: /Checkbox 2/ });
    const checkThree = screen.getByRole("checkbox", { name: /Checkbox 3/ });

    userEvent.click(checkThree);

    expect(mockCallback).toHaveBeenLastCalledWith(["test-checkbox-3"]);

    userEvent.click(checkOne);

    expect(mockCallback).toHaveBeenLastCalledWith([
      "test-checkbox-1",
      "test-checkbox-3",
    ]);

    userEvent.click(checkTwo);

    expect(mockCallback).toHaveBeenLastCalledWith([
      "test-checkbox-1",
      "test-checkbox-2",
      "test-checkbox-3",
    ]);
  });
});
