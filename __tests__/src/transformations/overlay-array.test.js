import { OverlayArrayTransformation } from "src/transformations/overlay-array";

describe("OverlayArrayTransformation", () => {
  describe("#toString", () => {
    it("removes string when transformation is empty", () => {
      const tf = new OverlayArrayTransformation([], "test-overlay");

      expect(tf.toString()).toEqual("");
    });

    it("generates correct transformation string for multiple overlays", () => {
      const tf = new OverlayArrayTransformation(
        ["test-overlay-1", "test-overlay-2"],
        "overlays"
      );

      expect(tf.toString()).toEqual(
        "l_Inscryber:overlays:v1:test-overlay-1/" +
          "l_Inscryber:overlays:v1:test-overlay-2/"
      );
    });

    it("appends optional positional transformation if provided", () => {
      const tf = new OverlayArrayTransformation(
        ["test-overlay-1", "test-overlay-2", "test-overlay-3"],
        "overlays",
        { positionalTransformation: "t_test_" }
      );

      expect(tf.toString()).toEqual(
        "l_Inscryber:overlays:v1:test-overlay-1/t_test_1/" +
          "l_Inscryber:overlays:v1:test-overlay-2/t_test_2/" +
          "l_Inscryber:overlays:v1:test-overlay-3/t_test_3/"
      );
    });
  });
});
