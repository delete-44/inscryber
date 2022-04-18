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
      `${encodeURIComponent(this.value)},` +
      `w_525,c_${
        this.value.length < 12 ? "fit" : "scale"
      }/fl_layer_apply,g_center,y_-395/`
    );
  }
}
