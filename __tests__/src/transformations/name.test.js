import { NameTransformation } from "src/transformations/name";

describe("NameTransformation", () => {
  describe("#toString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new NameTransformation("");

      expect(tf.toString()).toEqual("");
    });

    it("generates correct transformation string for short strings", () => {
      const tf = new NameTransformation("123456789");

      expect(tf.toString()).toEqual(
        "l_text:Inscryber:HEAVYWEIGHT.ttf_128:123456789/t_name_short/"
      );
    });

    it("generates correct transformation string for long strings", () => {
      const tf = new NameTransformation("123456789012");

      expect(tf.toString()).toEqual(
        "l_text:Inscryber:HEAVYWEIGHT.ttf_128:123456789012/t_name_long/"
      );
    });

    it("encodes special characters in transformation", () => {
      const tf = new NameTransformation("Test String");

      expect(tf.toString()).toEqual(
        `l_text:Inscryber:HEAVYWEIGHT.ttf_128:Test%20String/t_name_short/`
      );
    });
  });
});
