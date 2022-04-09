import { SigilsTransformation } from "src/transformations/sigils";

describe("SigilsTransformation", () => {
  describe("#toString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new SigilsTransformation([]);

      expect(tf.toString()).toEqual("");
    });

    it("generates correct transformation string for single sigil", () => {
      const tf = new SigilsTransformation(["test-sigil-1"]);

      expect(tf.toString()).toEqual(
        "l_Inscryber:Sigils:v1:test-sigil-1/t_sigil/"
      );
    });

    it("generates correct transformation string for multiple sigils", () => {
      const tf = new SigilsTransformation(["test-sigil-1", "test-sigil-2"]);

      expect(tf.toString()).toEqual(
        "l_Inscryber:Sigils:v1:test-sigil-1/t_v1_sigil_1/" +
          "l_Inscryber:Sigils:v1:test-sigil-2/t_v1_sigil_2/"
      );
    });
  });
});
