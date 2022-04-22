import { CostTransformation } from "./cost";

export class EnergyCostTransformation extends CostTransformation {
  constructor(value, config = {}) {
    super(value, "cost");

    this.isRare = config.isRare || false;
  }

  generateTransformation(value, filename) {
    // Energy costs support a "rare" alternate version
    const rareModifier = this.isRare ? "rare_" : "";

    return `l_Inscryber:Costs:v2:${filename}_${rareModifier}${value}/t_cost/`;
  }
}
