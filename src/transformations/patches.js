import { Transformation } from "../transformation";

export class PatchesTransformation extends Transformation {
  constructor(value, _type) {
    super(value, "patches");
  }

  toString() {
    console.log("[PatchesTransformation] Generating transformation string");

    if (this.value.length === 0) return "";

    // Add transformation for each patch. Transformations
    // are named in Cloudinary in the form patch_x
    let transformation = "";

    this.value.forEach((p, i) => {
      transformation += `l_Inscryber:Patches:v1:${p}/t_patch_${++i}/`;
    });

    return transformation;
  }
}
