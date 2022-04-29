import { Transformation } from "../transformation";

export class PortraitTransformation extends Transformation {
  constructor(value, config) {
    super(value, "portrait", config);
  }

  toString() {
    const { filename, manipulations } = this.value;

    if (!filename) return "";

    let tfString = `l_${filename}/`;

    if (manipulations && manipulations.length > 0)
      tfString += `${manipulations.join("/")}/`;

    tfString += this.isActThree ? "t_act_3_portrait_v1/" : "t_portrait_v1/";

    return tfString;
  }
}
