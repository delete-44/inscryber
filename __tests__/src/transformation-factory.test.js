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

    it("returns a SigilsTransformation for sigils", () => {
      const tf = TransformationFactory.build("sigils");

      expect(tf.constructor.name).toEqual("SigilsTransformation");
    });

    it("returns an OverlayArrayTransformation with valid config for patches", () => {
      const tf = TransformationFactory.build("patches", ["tst"]);

      expect(tf.constructor.name).toEqual("OverlayArrayTransformation");
      expect(tf.toString()).toMatch(/t_patch_1/);
    });

    it("returns an OverlayArrayTransformation with valid config for tribes", () => {
      const tf = TransformationFactory.build("tribes", ["tst"]);

      expect(tf.constructor.name).toEqual("OverlayArrayTransformation");
      expect(tf.toString()).toMatch(/t_tribe_1/);
    });

    it("returns an OverlayArrayTransformation with no positionTF for overlays", () => {
      const tf = TransformationFactory.build("overlays", ["tst"]);

      expect(tf.constructor.name).toEqual("OverlayArrayTransformation");

      // Confirm no additional transformation is added. These are numbered
      // by default, so can check for the non-existence of the number
      expect(tf.toString()).not.toMatch(/tst\/.*1/);
    });

    it("returns a PortraitTransformation for portrait", () => {
      const tf = TransformationFactory.build("portrait");

      expect(tf.constructor.name).toEqual("PortraitTransformation");
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
