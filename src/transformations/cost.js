import { Transformation } from "../transformation";
import { HEAVYWEIGHT } from "components/constants";

export class CostTransformation extends Transformation {
  constructor(value, _type) {
    super(value, "cost");
  }

  toString() {
    return "";
  }
}
