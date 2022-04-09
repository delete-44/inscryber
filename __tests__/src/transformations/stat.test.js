import { StatTransformation } from "src/transformations/stat";
import { HEAVYWEIGHT } from "components/constants";

describe("StatTransformation", () => {
  describe("#toString", () => {
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

    it("removes string when transformation is empty", () => {
      const tf = new StatTransformation("");

      expect(tf.toString()).toEqual("");
    });
  });
});
