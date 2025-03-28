import { Transformation } from "src/transformation";

describe("Transformation", () => {
  describe("#toString", () => {
    it("returns act 1 themed transformation by default", () => {
      const tf = new Transformation("Test Transformation", "Test");

      try {
        tf.toString();
      } catch (e) {
        expect(e.message).toEqual("[Act 1] To be overwritten in subclass");
      }
    });

    it("returns act 3 themed transformation when specified", () => {
      const tf = new Transformation("Test Transformation", "Test", {
        isActThree: true,
      });

      try {
        tf.toString();
      } catch (e) {
        expect(e.message).toEqual("[Act 3] To be overwritten in subclass");
      }
    });
  });
});
