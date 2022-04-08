import { NameTransformation } from "./transformations/name";
import { StatTransformation } from "./transformations/stat";

export class TransformationFactory {
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
