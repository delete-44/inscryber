import { TribesTransformation } from "src/transformations/tribes";

describe("TribesTransformation", () => {
  describe("#toString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new TribesTransformation([]);

      expect(tf.toString()).toEqual("");
    });

    it("generates correct transformation string for multiple tribes", () => {
      const tf = new TribesTransformation([
        "test-tribe-1",
        "test-tribe-2",
        "test-tribe-3",
        "test-tribe-4",
      ]);

      expect(tf.toString()).toEqual(
        "l_Inscryber:Tribes:v1:test-tribe-1/t_tribe_1/" +
          "l_Inscryber:Tribes:v1:test-tribe-2/t_tribe_2/" +
          "l_Inscryber:Tribes:v1:test-tribe-3/t_tribe_3/" +
          "l_Inscryber:Tribes:v1:test-tribe-4/t_tribe_4/"
      );
    });
  });
});
