import { Transformation } from "../transformation";
import { HEAVYWEIGHT } from "components/constants";

export class NameTransformation extends Transformation {
  constructor(value, config) {
    super(value, "name", config);
  }

  actOneString() {
    if (this.value === "") return "";

    return (
      `l_text:${HEAVYWEIGHT}_128:` +
      `${encodeURIComponent(this.value)}/` +
      `t_name_${this.value.length < 12 ? "short" : "long"}/`
    );
  }

  actThreeString() {
    if (this.value === "") return "";

    return (
      `l_text:${HEAVYWEIGHT}_96_center:` +
      `${encodeURIComponent(this.value)}/` +
      `t_name_${this.value.length < 12 ? "short" : "long"}/`
    );
  }
}
