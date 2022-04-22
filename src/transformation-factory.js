import { NameTransformation } from "src/transformations/name";
import { StatTransformation } from "src/transformations/stat";
import { CostTransformation } from "src/transformations/cost";
import { EnergyCostTransformation } from "src/transformations/energy-cost";
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
    const config = { isActThree: cardBase.match(/po3/) };

    switch (type) {
      case "name":
        return new NameTransformation(value, config);
      case "power":
      case "health":
        return new StatTransformation(value, type, config);
      case "cost":
        return value.currency.match(/energy/)
          ? new EnergyCostTransformation(value, { isRare: cardBase === "rare" })
          : new CostTransformation(value);
      case "sigils":
        return new SigilsTransformation(value, config);
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
