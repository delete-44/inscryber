import { NameTransformation } from "./transformations/name";

export class TransformationFactory {
  static createTransformation(type, value) {
    switch (type) {
      case "NAME":
        return new NameTransformation(value);
      default:
        throw new Error("Undefined Transformation");
    }
  }
}
