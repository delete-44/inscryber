import { Transformation } from "../transformation";

export class SigilsTransformation extends Transformation {
  constructor(value, config) {
    super(value, "sigils", config);
  }

  toString() {
    if (this.value.length < 1) return "";

    // Use act 3 transformations if needed
    const actThreeModifier = this.isActThree ? "act_3_" : "";

    // Single sigils are larger and central than multiple sigils
    if (this.value.length < 2)
      return `l_Inscryber:Sigils:v1:${this.value[0]}/t_${actThreeModifier}sigil/`;

    // Add transformation for each sigil. Transformations
    // are named in Cloudinary in the form sigil_x
    let transformation = "";

    this.value.forEach((s, i) => {
      transformation += `l_Inscryber:Sigils:v1:${s}/t_v1_sigil_${++i}/`;
    });

    return transformation;
  }
}
