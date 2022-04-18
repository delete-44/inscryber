import { NameTransformation } from "src/transformations/name";
import { HEAVYWEIGHT } from "components/constants";

describe("NameTransformation", () => {
  describe("#actOneString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new NameTransformation("");

      expect(tf.toString()).toEqual("");
    });

    it("generates correct transformation string for short strings", () => {
      const tf = new NameTransformation("123456789");

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_128:123456789/t_name_short/`
      );
    });

    it("generates correct transformation string for long strings", () => {
      const tf = new NameTransformation("123456789012");

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_128:123456789012/t_name_long/`
      );
    });

    it("encodes special characters in transformation", () => {
      const tf = new NameTransformation("Test String");

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_128:Test%20String/t_name_short/`
      );
    });
  });

  describe("#actThreeString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new NameTransformation("", { isActThree: true });

      expect(tf.toString()).toEqual("");
    });

    it("generates correct transformation string for short strings", () => {
      const tf = new NameTransformation("123456789", { isActThree: true });

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_96_center:123456789/t_act_3_name_short/`
      );
    });

    it("generates correct transformation string for long strings", () => {
      const tf = new NameTransformation("123456789012", { isActThree: true });

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_96_center:123456789012/t_act_3_name_long/`
      );
    });

    it("encodes special characters in transformation", () => {
      const tf = new NameTransformation("Test String", { isActThree: true });

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_96_center:Test%20String/t_act_3_name_short/`
      );
    });
  });
});
