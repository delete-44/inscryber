import { Transformation } from "../transformation";

export class OverlaysTransformation extends Transformation {
  constructor(value, _type) {
    super(value, "overlays");
  }

  toString() {
    console.log("[OverlaysTransformation] Generating transformation string");

    if (this.value.length === 0) return "";

    // Add transformation for each overlay. Transformations
    // are named in Cloudinary in the form overlay_x
    let transformation = "";

    this.value.forEach((t, i) => {
      transformation += `l_Inscryber:Overlays:v1:${t}/`;
    });

    return transformation;
  }
}
