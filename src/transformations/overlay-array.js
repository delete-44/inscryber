import { Transformation } from "../transformation";

export class OverlayArrayTransformation extends Transformation {
  constructor(value, type) {
    super(value, type);
  }

  toString() {
    console.log(
      "[OverlayArrayTransformation] Generating transformation string"
    );

    if (this.value.length === 0) return "";

    // Add transformation for each overlay. Transformations
    // are named in Cloudinary in the form overlay_x
    let transformation = "";

    this.value.forEach((t, i) => {
      transformation += `l_Inscryber:${this.type}:v1:${t}/`;
    });

    return transformation;
  }
}
