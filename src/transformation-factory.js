import { NameTransformation } from "./transformations/name";
import { StatTransformation } from "./transformations/stat";

export class TransformationFactory {
  /**
   * Factory to select a specific transformation subclass.
   *
   * @param {String} type  Which transformation to return.
   * @param {String} value Any required details to build the transformation.
   *
   * @return {Transformation} An object of a specific subclass of Transformation.
   */
  static build(type, value) {
    switch (type) {
      case "name":
        return new NameTransformation(value);
      case "power":
        return new StatTransformation(value, type);
      case "health":
        return new StatTransformation(value, type);
      default:
        throw new Error("Undefined Transformation");
    }
  }
}
