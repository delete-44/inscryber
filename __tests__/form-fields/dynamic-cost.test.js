import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DynamicCost from "@form-fields/dynamic-cost";
import userEvent from "@testing-library/user-event";
import * as constants from "components/constants";

describe("DynamicCost", () => {
  const mockCallback = jest.fn();
  constants.CURRENCIES = [
    { filename: "test-1", label: "TEST 1", max: 100 },
    { filename: "test-2", label: "TEST 2", max: 30 },
    { filename: "test-3", label: "TEST 3", max: 5 },
  ];

  beforeEach(() => {
    render(<DynamicCost setCostTF={mockCallback} />);
    jest.clearAllMocks();
  });

  it("renders a cost number field & selectors for each currency", () => {
    const costField = screen.getByRole("spinbutton", { name: /Cost/ });
    const test1Field = screen.getByRole("radio", { name: /TEST 1/ });
    const test2Field = screen.getByRole("radio", { name: /TEST 2/ });
    const test3Field = screen.getByRole("radio", { name: /TEST 3/ });

    expect(costField).toBeInTheDocument();
    expect(costField).toHaveTextContent("");

    expect(test1Field).toBeInTheDocument();
    expect(test1Field).toBeChecked();

    expect(test2Field).toBeInTheDocument();
    expect(test2Field).not.toBeChecked();

    expect(test3Field).toBeInTheDocument();
    expect(test3Field).not.toBeChecked();
  });

  it("renders a flavourful description", () => {
    const costFlavour = screen.getByText("And every creature has a ...");
    const costLabel = screen.getByText("cost");

    expect(costFlavour).toBeInTheDocument();
    expect(costLabel).toBeInTheDocument();
  });

  it("removes transformation when value is 0 or empty", () => {
    const costField = screen.getByRole("spinbutton", { name: /Cost/ });

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-1_1/t_cost/"
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

    it("does not accept numbers greater than chosen currency max", () => {
      const costField = screen.getByRole("spinbutton", {
        name: /Cost/,
      });

      userEvent.type(costField, "10");

      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:test-1_10/t_cost/"
      );

      // Add third character
      userEvent.type(costField, "1");

      expect(mockCallback).toHaveBeenCalledTimes(2);
    });
  });

  it("automatically reduces input value when changing to a currency with a a max lower than current value", () => {
    const costField = screen.getByRole("spinbutton", { name: /Cost/ });

    userEvent.type(costField, "100");
    expect(costField).toHaveValue(100);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_test-1-bg-wide/" +
        "l_Inscryber:Costs:v2:test-1:1/t_v2_cost-ten" +
        "/l_Inscryber:Costs:v2:test-1:0/t_v2_cost-unit/"
    );

    const test2Field = screen.getByRole("radio", { name: /TEST 2/ });
    const test3Field = screen.getByRole("radio", { name: /TEST 3/ });

    userEvent.click(test2Field);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_test-2-bg-wide/" +
        "l_Inscryber:Costs:v2:test-2:3/t_v2_cost-ten/" +
        "l_Inscryber:Costs:v2:test-2:0/t_v2_cost-unit/"
    );

    expect(costField).toHaveValue(30);

    userEvent.click(test3Field);

    expect(costField).toHaveValue(5);

    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-3_5/t_cost/"
    );
  });

  it("switches between currencies when radio button selection changed", () => {
    const costField = screen.getByRole("spinbutton", { name: /Cost/ });

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-1_1/t_cost/"
    );

    const test1Field = screen.getByRole("radio", { name: /TEST 1/ });
    const test2Field = screen.getByRole("radio", { name: /TEST 2/ });
    const test3Field = screen.getByRole("radio", { name: /TEST 3/ });

    expect(test1Field).toBeChecked();
    expect(test2Field).not.toBeChecked();
    expect(test3Field).not.toBeChecked();

    userEvent.click(test2Field);

    expect(test1Field).not.toBeChecked();
    expect(test2Field).toBeChecked();
    expect(test3Field).not.toBeChecked();

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-2_1/t_cost/"
    );

    userEvent.click(test3Field);

    expect(test1Field).not.toBeChecked();
    expect(test2Field).not.toBeChecked();
    expect(test3Field).toBeChecked();

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-3_1/t_cost/"
    );
  });

  it("uses existing assets for costs up to 10", () => {
    const costField = screen.getByRole("spinbutton", { name: /Cost/ });

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-1_1/t_cost/"
    );

    userEvent.type(costField, "0");

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-1_10/t_cost/"
    );
  });

  it("dynamically generates 2-character costs", () => {
    const costField = screen.getByRole("spinbutton", { name: /Cost/ });

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-1_1/t_cost/"
    );

    userEvent.type(costField, "1");

    expect(mockCallback).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_test-1-bg-wide/" +
        "l_Inscryber:Costs:v2:test-1:1/t_v2_cost-ten/" +
        "l_Inscryber:Costs:v2:test-1:1/t_v2_cost-unit/"
    );

    userEvent.type(costField, "{selectall}{backspace}");

    expect(mockCallback).toHaveBeenCalledTimes(3);
    expect(mockCallback).toHaveBeenLastCalledWith("");

    userEvent.type(costField, "9");

    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "l_Inscryber:Costs:v2:test-1_9/t_cost/"
    );

    userEvent.type(costField, "9");

    expect(mockCallback).toHaveBeenCalledTimes(5);
    expect(mockCallback).toHaveBeenLastCalledWith(
      "t_v2_test-1-bg-wide/" +
        "l_Inscryber:Costs:v2:test-1:9/t_v2_cost-ten/" +
        "l_Inscryber:Costs:v2:test-1:9/t_v2_cost-unit/"
    );
  });
});
