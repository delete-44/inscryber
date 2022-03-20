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
    const birdField = screen.getByRole("checkbox", { name: /Bird/ });

    userEvent.click(birdField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:bird/t_tribe_1/"
    );
  });

  it("correctly unsets specific filenames", () => {
    const birdField = screen.getByRole("checkbox", { name: /Bird/ });
    const canineField = screen.getByRole("checkbox", { name: /Canine/ });

    userEvent.click(birdField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:bird/t_tribe_1/"
    );

    userEvent.click(canineField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:bird/t_tribe_1/" +
        "l_Inscryber:MultiCheckbox:v1:canine/t_tribe_2/"
    );

    userEvent.click(canineField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:bird/t_tribe_1/"
    );
  });

  it("sorts selected values alphabetically regardless of selection order", () => {
    const birdField = screen.getByRole("checkbox", { name: /Bird/ });
    const hoovedField = screen.getByRole("checkbox", { name: /Hooved/ });
    const reptileField = screen.getByRole("checkbox", { name: /Reptile/ });

    userEvent.click(reptileField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:reptile/t_tribe_1/"
    );

    userEvent.click(birdField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:bird/t_tribe_1/" +
        "l_Inscryber:MultiCheckbox:v1:reptile/t_tribe_2/"
    );

    userEvent.click(hoovedField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:bird/t_tribe_1/" +
        "l_Inscryber:MultiCheckbox:v1:hooved/t_tribe_2/" +
        "l_Inscryber:MultiCheckbox:v1:reptile/t_tribe_3/"
    );
  });

  it("correctly sets all transformations when all selected", () => {
    const birdField = screen.getByRole("checkbox", { name: /Bird/ });
    const canineField = screen.getByRole("checkbox", { name: /Canine/ });
    const hoovedField = screen.getByRole("checkbox", { name: /Hooved/ });
    const insectField = screen.getByRole("checkbox", { name: /Insect/ });
    const reptileField = screen.getByRole("checkbox", { name: /Reptile/ });

    userEvent.click(birdField);
    userEvent.click(canineField);
    userEvent.click(hoovedField);
    userEvent.click(insectField);
    userEvent.click(reptileField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:MultiCheckbox:v1:bird/t_tribe_1/" +
        "l_Inscryber:MultiCheckbox:v1:canine/t_tribe_2/" +
        "l_Inscryber:MultiCheckbox:v1:hooved/t_tribe_3/" +
        "l_Inscryber:MultiCheckbox:v1:insect/t_tribe_4/" +
        "l_Inscryber:MultiCheckbox:v1:reptile/t_tribe_5/"
    );
  });
});
