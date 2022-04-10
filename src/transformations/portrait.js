import { Transformation } from "../transformation";

export class PortraitTransformation extends Transformation {
  constructor(value, _type) {
    super(value, "portrait");
  }

  toString() {
    console.log("[PortraitTransformation] Generating transformation string");

    const { filename, manipulations } = this.value;

    if (!filename) return "";

    let tfString = `l_${filename}/t_portrait/`;

    if (manipulations) tfString += `${manipulations.join("/")}/`;

    return tfString;
  }
}