import { Transformation } from "../transformation";
import { CURRENCIES } from "components/constants";

export class CostTransformation extends Transformation {
  constructor(value, _type) {
    super(value, "cost");
  }

  toString() {
    console.log("[CostTransformation] Generating transformation string");

    const { currency, value } = this.value;
    const currencyDetails = CURRENCIES.find((c) => c.filename === currency);
    const { max, filename } = currencyDetails;

    // If switching to a currency with a lower max value,
    // ie blood to energy, it is possible to input a value
    // greater than the max. This eliminates that risk.
    if (value > max) {
      return this.#generateTransformation(max, filename);
    }

    // Remove transformation if card is free
    if (value === "" || value < 1) return "";

    return this.#generateTransformation(value, filename);
  }

  #generateTransformation(value, filename) {
    // For as long as we have valid assets (up to 10), use them
    if (value <= 10) return `l_Inscryber:Costs:v2:${filename}_${value}/t_cost/`;

    // For larger costs, generate them dynamically by rendering
    // a wide background, then each character of the number in line
    return (
      `t_v2_${filename}-bg-wide/` +
      `l_Inscryber:Costs:v2:${filename}:${String(value)[0]}/t_v2_cost-ten/` +
      `l_Inscryber:Costs:v2:${filename}:${String(value)[1]}/t_v2_cost-unit/`
    );
  }
}
