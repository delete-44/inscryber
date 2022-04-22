import { CostTransformation } from "./cost";
import { CURRENCIES } from "components/constants";

export class EnergyCostTransformation extends CostTransformation {
  constructor(value, config = {}) {
    super(value, "cost");

    this.isRare = config.isRare || false;
  }

  generateTransformation(value, filename) {
    throw new Error("OWO")
    // For as long as we have valid assets (up to 10), use them
    if (value <= 10) {
      // Certain costs support a "rare" alternate version for cheap costs
      return this.isRare && rareVersion
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
