import { Transformation } from "../transformation";
import { HEAVYWEIGHT } from "components/constants";

export class NameTransformation extends Transformation {
  constructor(value) {
    super(value);
  }

  toString() {
    return (
      `l_text:${HEAVYWEIGHT}_128:` +
      `${encodeURIComponent(this.value)}/` +
      `t_name_${this.value.length < 12 ? "short" : "long"}/`
    );
  }
}
