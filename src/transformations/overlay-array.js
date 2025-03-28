import { Transformation } from "../transformation";

export class OverlayArrayTransformation extends Transformation {
  constructor(value, type, config = {}) {
    super(value, type, config);

    this.positionalTransformation = config.positionalTransformation || "";
  }

  toString() {
    if (this.value.length === 0 || this.isActThree) return "";

    // Add transformation for each overlay. Transformations
    // are named in Cloudinary in the form overlay_x
    let transformation = "";

    this.value.forEach((t, i) => {
      transformation += `l_Inscryber:${this.type}:v1:${t}/`;

      // Certain overlays require positional adjustments - such as tribes
      if (this.positionalTransformation)
        transformation += `${this.positionalTransformation}${++i}/`;
    });

    return transformation;
  }
}
