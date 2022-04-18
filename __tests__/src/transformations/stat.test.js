import { StatTransformation } from "src/transformations/stat";
import { HEAVYWEIGHT, DAGGERSQUARE } from "components/constants";

describe("StatTransformation", () => {
  describe("#actOneString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new StatTransformation("");

      expect(tf.toString()).toEqual("");
    });

    it("generates correct width for values of 1", () => {
      const tf = new StatTransformation("1", "test");

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_196:1,c_scale,w_50/t_test/`
      );
    });

    it("generates correct width for values less than 100", () => {
      const tf = new StatTransformation("99", "test");

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_196:99,c_scale,w_80/t_test/`
      );
    });

    it("generates correct width for values greater than 100", () => {
      const tf = new StatTransformation("100", "test");

      expect(tf.toString()).toEqual(
        `l_text:${HEAVYWEIGHT}_196:100,c_scale,w_100/t_test/`
      );
    });
  });

  describe("#actThreeString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new StatTransformation("", "test", { isActThree: true });

      expect(tf.toString()).toEqual("");
    });

    it("uses fit cropping for small numbers", () => {
      const tf = new StatTransformation("1234", "test", { isActThree: true });

      expect(tf.toString()).toEqual(
        `l_text:${DAGGERSQUARE}_96_center:` +
          `1234,c_fit,co_rgb:03FDF0,w_230/` +
          `t_act_3_test/`
      );
    });

    it("uses scale cropping for large numbers", () => {
      const tf = new StatTransformation("12345", "test", { isActThree: true });

      expect(tf.toString()).toEqual(
        `l_text:${DAGGERSQUARE}_96_center:` +
          `12345,c_scale,co_rgb:03FDF0,w_230/` +
          `t_act_3_test/`
      );
    });
  });
});
