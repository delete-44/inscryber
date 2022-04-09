import { CostTransformation } from "src/transformations/cost";
import * as constants from "components/constants";

describe("CostTransformation", () => {
  constants.CURRENCIES = [
    { filename: "test-1", label: "TEST 1", max: 100 },
    { filename: "test-2", label: "TEST 2", max: 30 },
    { filename: "test-3", label: "TEST 3", max: 5 },
  ];

  describe("#toString", () => {
    it("removes string when value is 0", () => {
      const tf = new CostTransformation({ currency: "test-1", value: 0 });

      expect(tf.toString()).toEqual("");
    });

    it("removes string when value is empty", () => {
      const tf = new CostTransformation({ currency: "test-1", value: "" });

      expect(tf.toString()).toEqual("");
    });

    it("limits transformations to the max for the chosen currency", () => {
      let tf = new CostTransformation({ currency: "test-1", value: 101 });

      expect(tf.toString()).toEqual(
        "t_v2_test-1-bg-wide/" +
          "l_Inscryber:Costs:v2:test-1:1/t_v2_cost-ten/" +
          "l_Inscryber:Costs:v2:test-1:0/t_v2_cost-unit/"
      );

      tf = new CostTransformation({ currency: "test-2", value: 101 });

      expect(tf.toString()).toEqual(
        "t_v2_test-2-bg-wide/" +
          "l_Inscryber:Costs:v2:test-2:3/t_v2_cost-ten/" +
          "l_Inscryber:Costs:v2:test-2:0/t_v2_cost-unit/"
      );

      tf = new CostTransformation({ currency: "test-3", value: 101 });

      expect(tf.toString()).toEqual("l_Inscryber:Costs:v2:test-3_5/t_cost/");
    });
  });
});
