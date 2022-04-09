import { Transformation } from "src/transformation";

describe("Transformation", () => {
  it("throws an error unless toString is overridden", () => {
    const tf = new Transformation("Test Transformation", "Test");

    try {
      tf.toString();
    } catch (e) {
      expect(e.message).toEqual("To be overwritten in subclass");
    }
  });
});
