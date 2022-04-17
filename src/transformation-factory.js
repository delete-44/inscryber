import { NameTransformation } from "src/transformations/name";
import { StatTransformation } from "src/transformations/stat";
import { CostTransformation } from "src/transformations/cost";
import { SigilsTransformation } from "src/transformations/sigils";
import { OverlayArrayTransformation } from "src/transformations/overlay-array";
import { PortraitTransformation } from "src/transformations/portrait";

export class TransformationFactory {
  /**
   * Factory to select a specific transformation subclass.
   *
   * @param {String} type  Which transformation to return.
   * @param {String} value Any required details to build the transformation.
   *
   * @return {Transformation} An object of a specific subclass of Transformation.
   */
  static build(type, value, cardBase = "") {
    switch (type) {
      case "name":
        return new NameTransformation(value);
      case "power":
      case "health":
        return new StatTransformation(value, type, {
          isActThree: cardBase.match(/po3/),
        });
      case "cost":
        return new CostTransformation(value, { isRare: cardBase === "rare" });
      case "sigils":
        return new SigilsTransformation(value);
      case "patches":
        return new OverlayArrayTransformation(value, type, {
          positionalTransformation: "t_patch_",
        });
      case "tribes":
        return new OverlayArrayTransformation(value, type, {
          positionalTransformation: "t_tribe_",
        });
      case "overlays":
        return new OverlayArrayTransformation(value, type);
      case "portrait":
        return new PortraitTransformation(value);
      default:
        throw new Error(`Undefined Transformation: ${type}`);
    }
  }
}
