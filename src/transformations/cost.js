import { Transformation } from "../transformation";
import { CURRENCIES } from "components/constants";

export class CostTransformation extends Transformation {
  constructor(value, config = {}) {
    super(value, "cost");

    this.isRare = config.isRare || false;
  }

  toString() {
    const { currency, value } = this.value;
    const currencyDetails = CURRENCIES.find((c) => c.filename === currency);
    const { max, filename } = currencyDetails;

    // Remove transformation if card is free
    if (value === "" || value < 1) return "";

    // Cap transformations to the max value supported
    // by the chosen currency
    if (value > max) {
      return this.#generateTransformation(max, filename);
    }

    return this.#generateTransformation(value, filename);
  }

  #generateTransformation(value, filename) {
    // For as long as we have valid assets (up to 10), use them
    if (value <= 10) {
      // Energy costs support a "rare" alternate version
      return this.isRare && filename.match(/energy/)
        ? `l_Inscryber:Costs:v2:${filename}_rare_${value}/t_cost/`
        : `l_Inscryber:Costs:v2:${filename}_${value}/t_cost/`;
    }

    // For larger costs, generate them dynamically by rendering
    // a wide background, then each character of the number in line
    return (
      `t_v2_${filename}-bg-wide/` +
      `l_Inscryber:Costs:v2:${filename}:${String(value)[0]}/t_v2_cost-ten/` +
      `l_Inscryber:Costs:v2:${filename}:${String(value)[1]}/t_v2_cost-unit/`
    );
  }
}
