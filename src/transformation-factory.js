import { NameTransformation } from "./transformations/name";

export class TransformationFactory {
  static build(type, value) {
    switch (type) {
      case "name":
        return new NameTransformation(value);
      default:
        throw new Error("Undefined Transformation");
    }
  }
}
