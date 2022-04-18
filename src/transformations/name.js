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

    return (
      `l_text:${HEAVYWEIGHT}_128_center:` +
      `${encodeURIComponent(this.value)}/` +
      `t_${actThreeModifier}name_${tfLength}/`
    );
  }
}
