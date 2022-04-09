import { PatchesTransformation } from "src/transformations/patches";

describe("PatchesTransformation", () => {
  describe("#toString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new PatchesTransformation([]);

      expect(tf.toString()).toEqual("");
    });

    it("generates correct transformation string for multiple patches", () => {
      const tf = new PatchesTransformation([
        "test-patch-1",
        "test-patch-2",
        "test-patch-3",
        "test-patch-4",
      ]);

      expect(tf.toString()).toEqual(
        "l_Inscryber:Patches:v1:test-patch-1/t_patch_1/" +
          "l_Inscryber:Patches:v1:test-patch-2/t_patch_2/" +
          "l_Inscryber:Patches:v1:test-patch-3/t_patch_3/" +
          "l_Inscryber:Patches:v1:test-patch-4/t_patch_4/"
      );
    });
  });
});
