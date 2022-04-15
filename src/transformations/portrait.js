import { Transformation } from "../transformation";

export class PortraitTransformation extends Transformation {
  constructor(value) {
    super(value, "portrait");
  }

  toString() {
    const { filename, manipulations } = this.value;

    if (!filename) return "";

    let tfString = `l_${filename}/`;

    if (manipulations && manipulations.length > 0)
      tfString += `${manipulations.join("/")}/`;

    tfString += "t_portrait/";

    return tfString;
  }
}
