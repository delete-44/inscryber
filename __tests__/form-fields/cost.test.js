import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Cost from "@form-fields/cost";
import selectEvent from "react-select-event";

describe("Cost", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<Cost setCostTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a cost combobox", () => {
    const costField = screen.getByRole("combobox", {
      "aria-label": /Cost/,
    });

    expect(costField).toBeInTheDocument();
    expect(costField).toHaveTextContent("");
  });

  it("renders a flavourful description", () => {
    const costFlavour = screen.getByText("There's always a ...");
    const costLabel = screen.getByText("cost");

    expect(costFlavour).toBeInTheDocument();
    expect(costLabel).toBeInTheDocument();
  });

  it("correctly sets a transformation", async () => {
    const costField = screen.getByRole("combobox", {
      "aria-label": /Cost/,
    });

    await selectEvent.select(costField, /1 Blood/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedCosts:blood_1/fl_layer_apply,g_north_east,x_32,y_110/"
    );

    await selectEvent.select(costField, /1 Bone/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedCosts:bone_1/fl_layer_apply,g_north_east,x_32,y_110/"
    );
  });

  it("completely removes the transformation when field is empty", async () => {
    const costField = screen.getByRole("combobox", {
      "aria-label": /Cost/,
    });

    await selectEvent.select(costField, /8 Bones/);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryption:ResizedCosts:bone_8/fl_layer_apply,g_north_east,x_32,y_110/"
    );

    await selectEvent.select(costField, /Free/);

    expect(mockCallback).toHaveBeenLastCalledWith("");
  });

  it("renders an option for each cost", async () => {
    const costField = screen.getByRole("combobox", {
      "aria-label": /Cost/,
    });

    selectEvent.openMenu(costField);

    expect(screen.getByText(/Free/)).toBeInTheDocument();

    expect(screen.getByText(/1 Blood/)).toBeInTheDocument();
    expect(screen.getByText(/2 Blood/)).toBeInTheDocument();
    expect(screen.getByText(/3 Blood/)).toBeInTheDocument();
    expect(screen.getByText(/4 Blood/)).toBeInTheDocument();

    expect(screen.getByText(/1 Bone/)).toBeInTheDocument();
    expect(screen.getByText(/2 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/3 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/4 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/5 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/6 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/7 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/8 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/9 Bones/)).toBeInTheDocument();
    expect(screen.getByText(/10 Bones/)).toBeInTheDocument();
  });
});
