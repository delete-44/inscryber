import { EnergyCostTransformation } from "src/transformations/energy-cost";
import * as constants from "components/constants";

describe("EnergyCostTransformation", () => {
  constants.CURRENCIES = [
    { filename: "test-1", label: "TEST 1", max: 100 },
    { filename: "test-2", label: "TEST 2", max: 30 },
    { filename: "test-3", label: "TEST 3", max: 5 },
  ];

  describe("#toString", () => {
    it("removes string when value is 0", () => {
      const tf = new EnergyCostTransformation({ currency: "test-1", value: 0 });

      expect(tf.toString()).toEqual("");
    });

    it("removes string when value is empty", () => {
      const tf = new EnergyCostTransformation({
        currency: "test-1",
        value: "",
      });

      expect(tf.toString()).toEqual("");
    });

    it("limits transformations to the max for the chosen currency", () => {
      let tf = new EnergyCostTransformation({ currency: "test-1", value: 101 });

      expect(tf.toString()).toEqual("l_Inscryber:Costs:v2:test-1_100/t_cost/");

      tf = new EnergyCostTransformation({ currency: "test-2", value: 101 });

      expect(tf.toString()).toEqual("l_Inscryber:Costs:v2:test-2_30/t_cost/");

      tf = new EnergyCostTransformation({ currency: "test-3", value: 101 });

      expect(tf.toString()).toEqual("l_Inscryber:Costs:v2:test-3_5/t_cost/");
    });

    it("does not select rare costs for non-rare cards", () => {
      const tf = new EnergyCostTransformation(
        { currency: "test-3", value: 1 },
        { isRare: false }
      );

      expect(tf.toString()).toEqual("l_Inscryber:Costs:v2:test-3_1/t_cost/");
    });

    it("sets rare costs for rare cards", () => {
      const tf = new EnergyCostTransformation(
        { currency: "test-3", value: 1 },
        { isRare: true }
      );

      expect(tf.toString()).toEqual(
        "l_Inscryber:Costs:v2:test-3_rare_1/t_cost/"
      );
    });

    it("does not select act 3 costs for act 1 cards", () => {
      const tf = new EnergyCostTransformation(
        { currency: "test-3", value: 1 },
        { isActThree: false }
      );

      expect(tf.toString()).toEqual("l_Inscryber:Costs:v2:test-3_1/t_cost/");
    });

    it("sets act 3 cost assets and transformations for act 3 cards", () => {
      const tf = new EnergyCostTransformation(
        { currency: "test-3", value: 1 },
        { isActThree: true }
      );

      expect(tf.toString()).toEqual(
        "l_Inscryber:Costs:v2:act_3_test-3_1/t_act_3_cost/"
      );
    });

    it("generates dynamic costs up to the max supported by currency", () => {
      const tf = new EnergyCostTransformation({
        currency: "test-1",
        value: 99,
      });

      expect(tf.toString()).toEqual("l_Inscryber:Costs:v2:test-1_99/t_cost/");
    });
  });
});
