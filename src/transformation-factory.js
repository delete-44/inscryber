import { NameTransformation } from "src/transformations/name";
import { StatTransformation } from "src/transformations/stat";

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
      case "health":
        return new StatTransformation(value, type);
      default:
        throw new Error(`Undefined Transformation: ${type}`);
    }
  }
}
