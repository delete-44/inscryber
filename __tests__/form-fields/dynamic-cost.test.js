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

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-narrow/l_Inscryber:Costs:v2:blood:1/t_v2_cost-unit/"
    );

    userEvent.type(costField, "{selectall}{backspace}");

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith("");

    userEvent.type(costField, "0");

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith("");
  });

  describe("invalid characters", () => {
    it("does not accept non-numerical characters", () => {
      const costField = screen.getByRole("spinbutton", {
        name: /Cost/,
      });

      userEvent.type(costField, "X");

      expect(mockCallback).toHaveBeenCalledTimes(0);

      userEvent.type(costField, "{selectall}{backspace}");
      userEvent.type(costField, "/");

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it("does not accept numbers less than 0", () => {
      const costField = screen.getByRole("spinbutton", {
        name: /Cost/,
      });

      userEvent.type(costField, "-1");

      expect(mockCallback).toHaveBeenCalledTimes(0);

      userEvent.type(costField, "{selectall}{backspace}");
      userEvent.type(costField, "-100");

      expect(mockCallback).toHaveBeenCalledTimes(0);
    });

    it("does not accept numbers greater than 99", () => {
      const costField = screen.getByRole("spinbutton", {
        name: /Cost/,
      });

      userEvent.type(costField, "10");

      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "t_v2_blood-bg-wide/" +
          "l_Inscryber:Costs:v2:blood:1/t_v2_cost-ten/" +
          "l_Inscryber:Costs:v2:blood:0/t_v2_cost-unit/"
      );

      // Add third character
      userEvent.type(costField, "0");

      expect(mockCallback).toHaveBeenCalledTimes(2);
    });
  });

  it("switches between bone & blood currencies when radio button selection changed", () => {});

  it("uses narrow background for numbers less than 10", () => {
    const costField = screen.getByRole("spinbutton", {
      name: /Cost/,
    });

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-narrow/l_Inscryber:Costs:v2:blood:1/t_v2_cost-unit/"
    );

    userEvent.type(costField, "{selectall}{backspace}");

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith("");

    userEvent.type(costField, "9");

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-narrow/l_Inscryber:Costs:v2:blood:9/t_v2_cost-unit/"
    );
  });

  it("uses narrow background and reduces padding for numbers less than 20", () => {});

  it("uses wide backgrounds for 2-character numbers", () => {
    const costField = screen.getByRole("spinbutton", {
      name: /Cost/,
    });

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-narrow/l_Inscryber:Costs:v2:blood:1/t_v2_cost-unit/"
    );

    userEvent.type(costField, "0");

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-wide/" +
        "l_Inscryber:Costs:v2:blood:1/t_v2_cost-ten/" +
        "l_Inscryber:Costs:v2:blood:0/t_v2_cost-unit/"
    );

    userEvent.type(costField, "{selectall}{backspace}");

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith("");

    userEvent.type(costField, "9");

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-narrow/l_Inscryber:Costs:v2:blood:9/t_v2_cost-unit/"
    );

    userEvent.type(costField, "9");

    expect(mockCallback).toHaveBeenCalledTimes(5);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_blood-bg-wide/" +
        "l_Inscryber:Costs:v2:blood:9/t_v2_cost-ten/" +
        "l_Inscryber:Costs:v2:blood:9/t_v2_cost-unit/"
    );
  });
});
