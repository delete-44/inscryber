import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DynamicCost from "@form-fields/dynamic-cost";
import userEvent from "@testing-library/user-event";
import * as constants from "components/constants";

describe("DynamicCost", () => {
  const mockCallback = jest.fn();

  describe("with base constants", () => {
    beforeEach(() => {
      render(<DynamicCost setCostTF={mockCallback} />);
      jest.clearAllMocks();
    });

    it("renders a cost number field & selectors for each currency", () => {
      const costField = screen.getByRole("spinbutton", { name: /Cost/ });
      const bloodField = screen.getByRole("radio", { name: /Blood/ });
      const boneField = screen.getByRole("radio", { name: /Bone/ });
      const energyField = screen.getByRole("radio", { name: /Energy/ });

      expect(costField).toBeInTheDocument();
      expect(costField).toHaveTextContent("");

      expect(bloodField).toBeInTheDocument();
      expect(bloodField).toBeChecked();

      expect(boneField).toBeInTheDocument();
      expect(boneField).not.toBeChecked();

      expect(energyField).toBeInTheDocument();
      expect(energyField).not.toBeChecked();
    });

    it("renders a flavourful description", () => {
      const costFlavour = screen.getByText("And every creature has a ...");
      const costLabel = screen.getByText("cost");

      expect(costFlavour).toBeInTheDocument();
      expect(costLabel).toBeInTheDocument();
    });
  });

  describe("with test data", () => {
    constants.CURRENCIES = [
      { filename: "test-1", label: "TEST 1", max: 100 },
      { filename: "test-2", label: "TEST 2", max: 30 },
      { filename: "test-3", label: "TEST 3", max: 5 },
    ];

    beforeEach(() => {
      render(<DynamicCost setCostTF={mockCallback} />);
      jest.clearAllMocks();
    });

    it("removes transformation when value is 0 or empty", () => {
      const costField = screen.getByRole("spinbutton", { name: /Cost/ });

      userEvent.type(costField, "1");

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:blood_1/t_cost/"
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

      it("does not accept numbers greater than currency max", () => {
        const costField = screen.getByRole("spinbutton", {
          name: /Cost/,
        });

        userEvent.type(costField, "10");

        expect(mockCallback).toHaveBeenCalledTimes(2);
        expect(mockCallback).toHaveBeenLastCalledWith(
          "l_Inscryber:Costs:v2:blood_10/t_cost/"
        );

        // Add third character
        userEvent.type(costField, "0");

        expect(mockCallback).toHaveBeenCalledTimes(2);
      });
    });

    it("switches between bone & blood currencies when radio button selection changed", () => {
      const costField = screen.getByRole("spinbutton", { name: /Cost/ });

      userEvent.type(costField, "10");

      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:blood_10/t_cost/"
      );

      const bloodField = screen.getByRole("radio", {
        name: /Blood/,
      });

      const boneField = screen.getByRole("radio", {
        name: /Bone/,
      });

      userEvent.click(boneField);

      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:bone_10/t_cost/"
      );

      userEvent.click(bloodField);

      expect(mockCallback).toHaveBeenCalledTimes(4);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:blood_10/t_cost/"
      );
    });

    it("uses existing assets for costs up to 10", () => {
      const costField = screen.getByRole("spinbutton", { name: /Cost/ });

      userEvent.type(costField, "1");

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:blood_1/t_cost/"
      );

      userEvent.type(costField, "0");

      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:blood_10/t_cost/"
      );
    });

    it("dynamically generates 2-character costs", () => {
      const costField = screen.getByRole("spinbutton", { name: /Cost/ });

      userEvent.type(costField, "1");

      expect(mockCallback).toHaveBeenCalledTimes(1);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:blood_1/t_cost/"
      );

      userEvent.type(costField, "1");

      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "t_v2_blood-bg-wide/" +
          "l_Inscryber:Costs:v2:blood:1/t_v2_cost-ten/" +
          "l_Inscryber:Costs:v2:blood:1/t_v2_cost-unit/"
      );

      userEvent.type(costField, "{selectall}{backspace}");

      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback).toHaveBeenLastCalledWith("");

      userEvent.type(costField, "9");

      expect(mockCallback).toHaveBeenCalledTimes(4);
      expect(mockCallback).toHaveBeenLastCalledWith(
        "l_Inscryber:Costs:v2:blood_9/t_cost/"
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
});
