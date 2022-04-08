import { TransformationFactory } from "src/transformation-factory";

describe("TransformationFactory", () => {
  describe("#build", () => {
    it("returns a NameTransformation for name types", () => {
      const tf = TransformationFactory.build("name");

      expect(tf.constructor.name).toEqual("NameTransformation");
    });

    it("returns a StatTransformation for power types", () => {
      const tf = TransformationFactory.build("power");

      expect(tf.constructor.name).toEqual("StatTransformation");
    });

    it("returns a StatTransformation for health types", () => {
      const tf = TransformationFactory.build("health");

      expect(tf.constructor.name).toEqual("StatTransformation");
    });

    it("throws an exception if type is unknown", () => {
      try {
        TransformationFactory.build("invalid type");
      } catch (e) {
        expect(e.message).toEqual("Undefined Transformation: invalid type");
      }
    });
  });
});
