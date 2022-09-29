import { Transformation } from "../transformation";

export class TribesTransformation extends Transformation {
  constructor(value, type, config = {}) {
    super(value, type, config);
  }

  toString() {
    if (this.value.length === 0 || this.isActThree) return "";

    // Add transformation for each overlay. Transformations
    // are named in Cloudinary in the form overlay_x
    let transformation = "";

    this.value.forEach((t, i) => {
      transformation += `l_Inscryber:${this.type}:v1:${t}/`;
      transformation += `t_tribe_${++i}/`;

      if (this.value.length > 5 && i > 3) {
        // Special transformation
      }
    });

    return transformation;
  }
}
