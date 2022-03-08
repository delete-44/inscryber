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

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/"
    );
  });

  it("correctly unsets specific transformations", () => {
    const birdField = screen.getByRole("checkbox", { name: /Bird/ });
    const canineField = screen.getByRole("checkbox", { name: /Canine/ });

    userEvent.click(birdField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/"
    );

    userEvent.click(canineField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:canine/t_tribe_2/"
    );

    userEvent.click(canineField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/"
    );
  });

  it("sorts selected tribes alphabetically regardless of selection order", () => {
    const birdField = screen.getByRole("checkbox", { name: /Bird/ });
    const hoovedField = screen.getByRole("checkbox", { name: /Hooved/ });
    const reptileField = screen.getByRole("checkbox", { name: /Reptile/ });

    userEvent.click(reptileField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:reptile/t_tribe_1/"
    );

    userEvent.click(birdField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_2/"
    );

    userEvent.click(hoovedField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:hooved/t_tribe_2/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_3/"
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
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:canine/t_tribe_2/" +
        "l_Inscryption:ResizedTribes:hooved/t_tribe_3/" +
        "l_Inscryption:ResizedTribes:insect/t_tribe_4/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_5/"
    );
  });

  it("removes the transformation when all transformations deselected", () => {
    const birdField = screen.getByRole("checkbox", { name: /Bird/ });
    const canineField = screen.getByRole("checkbox", { name: /Canine/ });
    const hoovedField = screen.getByRole("checkbox", { name: /Hooved/ });
    const insectField = screen.getByRole("checkbox", { name: /Insect/ });
    const reptileField = screen.getByRole("checkbox", { name: /Reptile/ });

    userEvent.click(canineField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:canine/t_tribe_1/"
    );

    userEvent.click(reptileField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:canine/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_2/"
    );

    userEvent.click(birdField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:canine/t_tribe_2/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_3/"
    );

    userEvent.click(insectField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:canine/t_tribe_2/" +
        "l_Inscryption:ResizedTribes:insect/t_tribe_3/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_4/"
    );

    userEvent.click(hoovedField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:bird/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:canine/t_tribe_2/" +
        "l_Inscryption:ResizedTribes:hooved/t_tribe_3/" +
        "l_Inscryption:ResizedTribes:insect/t_tribe_4/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_5/"
    );

    userEvent.click(birdField);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedTribes:canine/t_tribe_1/" +
        "l_Inscryption:ResizedTribes:hooved/t_tribe_2/" +
        "l_Inscryption:ResizedTribes:insect/t_tribe_3/" +
        "l_Inscryption:ResizedTribes:reptile/t_tribe_4/"
    );

    userEvent.click(canineField);
    userEvent.click(hoovedField);
    userEvent.click(insectField);
    userEvent.click(reptileField);

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });
});
