import { SigilsTransformation } from "src/transformations/sigils";

describe("SigilsTransformation", () => {
  describe("#toString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new SigilsTransformation([]);

      expect(tf.toString()).toEqual("");
    });

    describe("when a single sigil", () => {
      it("generates correct transformation string", () => {
        const tf = new SigilsTransformation(["test-sigil-1"]);

        expect(tf.toString()).toEqual(
          "l_Inscryber:Sigils:v1:test-sigil-1/t_sigil/"
        );
      });

      it("adds act three modifier if needed", () => {
        const tf = new SigilsTransformation(["test-sigil-1"], {
          isActThree: true,
        });

        expect(tf.toString()).toEqual(
          "l_Inscryber:Sigils:v1:test-sigil-1/t_act_3_sigil/"
        );
      });
    });

    describe("when multiple sigils", () => {
      it("generates correct transformation string", () => {
        const tf = new SigilsTransformation(["test-sigil-1", "test-sigil-2"]);

        expect(tf.toString()).toEqual(
          "l_Inscryber:Sigils:v1:test-sigil-1/t_v1_sigil_1/" +
            "l_Inscryber:Sigils:v1:test-sigil-2/t_v1_sigil_2/"
        );
      });

      it("adds act three modifier if needed", () => {
        const tf = new SigilsTransformation(["test-sigil-1", "test-sigil-2"], {
          isActThree: true,
        });

        expect(tf.toString()).toEqual(
          "l_Inscryber:Sigils:v1:test-sigil-1/t_v1_act_3_sigil_1/" +
            "l_Inscryber:Sigils:v1:test-sigil-2/t_v1_act_3_sigil_2/"
        );
      });
    });
  });
});
