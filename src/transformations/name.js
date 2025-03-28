import { Transformation } from "../transformation";
import { HEAVYWEIGHT } from "components/constants";

export class NameTransformation extends Transformation {
  constructor(value, config) {
    super(value, "name", config);
  }

  toString() {
    if (this.value === "") return "";

    // Use act 3 transformations if needed
    const actThreeModifier = this.isActThree ? "act_3_" : "";

    // Prefer different transformation for short strings
    const tfLength = this.value.length < 12 ? "short" : "long";

    // Entire overlay is double-encoded as per this article:
    // https://support.cloudinary.com/hc/en-us/articles/202521512
    // "Generally it would be a good practice to double-escape the entire overlaid text"
    return (
      `l_text:${HEAVYWEIGHT}_128_center:` +
      `${encodeURIComponent(encodeURIComponent(this.value))}/` +
      `t_${actThreeModifier}name_${tfLength}/`
    );
  }
}
