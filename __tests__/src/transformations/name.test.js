import { NameTransformation } from "src/transformations/name";

describe("NameTransformation", () => {
  describe("#toString", () => {
    it("generates correct transformation string", () => {
      const tf = new NameTransformation("Test Transformation");

      expect(tf.toString()).toEqual(
        "l_text:Inscryber:HEAVYWEIGHT.ttf_128:Test%20Transformation/t_name_long/"
      );
    });

    it("removes string when transformation is empty", () => {
      const tf = new NameTransformation("");

      expect(tf.toString()).toEqual("");
    });
  });
});
