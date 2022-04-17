import { Transformation } from "../transformation";
import { HEAVYWEIGHT, DAGGERSQUARE } from "components/constants";

export class StatTransformation extends Transformation {
  actOneString() {
    if (this.value === "") return "";

    return (
      `l_text:${HEAVYWEIGHT}_196:` +
      `${encodeURIComponent(this.value)},` +
      `c_scale,w_${this.#getWidth(this.value)}` +
      `/t_${this.type}/`
    );
  }

  actThreeString() {
    // Short strings use "fit" cropping so the numbers do not get distorted
    // Long strings use "scale" cropping so the numbers shrink to fit
    const cropType = this.value.length < 5 ? "c_fit" : "c_scale";

    return (
      `l_text:${DAGGERSQUARE}_96_center:` +
      `${this.value},${cropType},co_rgb:03FDF0,w_230/` +
      `t_act_3_${this.type}/`
    );
  }

  #getWidth() {
    if (this.value === "1") return 50;

    if (this.value.length < 3) return 50 + this.value.length * 15;

    return 100;
  }
}
