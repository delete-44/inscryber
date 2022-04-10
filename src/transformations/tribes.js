import { Transformation } from "../transformation";

// FIXME: This could be merged with ./sigils, ./overlays,
// and ./patches as one generic "array-transformation"
export class TribesTransformation extends Transformation {
  constructor(value, _type) {
    super(value, "tribes");
  }

  toString() {
    console.log("[TribesTransformation] Generating transformation string");

    if (this.value.length === 0) return "";

    // Add transformation for each tribe. Transformations
    // are named in Cloudinary in the form tribe_x
    let transformation = "";

    this.value.forEach((t, i) => {
      transformation += `l_Inscryber:Tribes:v1:${t}/t_tribe_${++i}/`;
    });

    return transformation;
  }
}
