import { Transformation } from "../transformation";

export class SigilsTransformation extends Transformation {
  constructor(value, config) {
    super(value, "sigils", config);
  }

  toString() {
    if (this.value.length < 1) return "";

    // Use act 3 transformations if needed
    const actThreeModifier = this.isActThree ? "po3_" : "";

    // Add transformation for each sigil. Transformations
    // are named in Cloudinary in the form sigil_x_of_y
    let transformation = "";
    const max = this.value.length;

    this.value.forEach((s, i) => {
      transformation +=
        `l_Inscryber:Sigils:v1:${s}/` +
        `t_${actThreeModifier}sigil_${++i}_of_${max}/`;
    });

    return transformation;
  }
}
