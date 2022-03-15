import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DynamicCost from "@form-fields/dynamic-cost";
import userEvent from "@testing-library/user-event";

describe("DynamicCost", () => {
  const mockCallback = jest.fn();

  beforeEach(() => {
    render(<DynamicCost setCostTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a cost number field & selectors for each currency", () => {
    const costField = screen.getByRole("spinbutton", {
      name: /Cost/,
    });

    const bloodField = screen.getByRole("radio", {
      name: /Blood/,
    });

    const boneField = screen.getByRole("radio", {
      name: /Bone/,
    });

    expect(costField).toBeInTheDocument();
    expect(costField).toHaveTextContent("");

    expect(bloodField).toBeInTheDocument();
    expect(bloodField).toBeChecked();

    expect(boneField).toBeInTheDocument();
    expect(boneField).not.toBeChecked();
  });

  it("renders a flavourful description", () => {
    const costFlavour = screen.getByText("And every creature has a ...");
    const costLabel = screen.getByText("cost");

    expect(costFlavour).toBeInTheDocument();
    expect(costLabel).toBeInTheDocument();
  });

  it("removes transformation when value is 0 or empty", () => {
    const costField = screen.getByRole("spinbutton", {
      name: /Cost/,
    });

    userEvent.type(costField, "5");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-narrow/l_Inscryber:Costs:v2:blood:5/t_v2_cost-unit/"
    );

    userEvent.type(costField, "{selectall}{backspace}");

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith("");

    userEvent.type(costField, "0");

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith("");
  });
});
