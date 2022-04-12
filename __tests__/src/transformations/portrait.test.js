import { PortraitTransformation } from "src/transformations/portrait";

describe("PortraitTransformation", () => {
  describe("#toString", () => {
    it("removes string when filename is undefined", () => {
      const tf = new PortraitTransformation({});

      expect(tf.toString()).toEqual("");
    });

    it("removes string when filename is empty", () => {
      const tf = new PortraitTransformation({
        filename: "",
        manipulations: ["test-manipulation-1"],
      });

      expect(tf.toString()).toEqual("");
    });

    it("generates un-manipulated TF string correctly", () => {
      const tf = new PortraitTransformation({ filename: "test-portrait" });

      expect(tf.toString()).toEqual("l_test-portrait/t_portrait/");
    });

    it("adds image manipulations if required", () => {
      const tf = new PortraitTransformation({
        filename: "test-portrait",
        manipulations: ["test-manipulation-1", "test-manipulation-2"],
      });

      expect(tf.toString()).toEqual(
        "l_test-portrait/test-manipulation-1/test-manipulation-2/t_portrait/"
      );
    });
  });
});
