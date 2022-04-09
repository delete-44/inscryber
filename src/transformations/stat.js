import { Transformation } from "../transformation";
import { HEAVYWEIGHT } from "components/constants";

export class StatTransformation extends Transformation {
  constructor(value, type) {
    super(value, type);
  }

  toString() {
    return (
      `l_text:${HEAVYWEIGHT}_196:` +
      `${encodeURIComponent(this.value)},` +
      `c_scale,w_${this.#getWidth(this.value)}` +
      `/t_${this.type}/`
    );
  }

  #getWidth() {
    if (this.value === "1") return 50;

    if (this.value.length < 3) return 50 + this.value.length * 15;

    return 100;
  }
}
