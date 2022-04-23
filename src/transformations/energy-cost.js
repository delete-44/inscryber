import { CostTransformation } from "./cost";

export class EnergyCostTransformation extends CostTransformation {
  constructor(value, config = {}) {
    super(value, config);

    this.isRare = config.isRare || false;
  }

  generateTransformation(value, filename) {
    // Energy costs support a "rare" alternate version
    const rareModifier = this.isRare ? "rare_" : "";

    // For energy costs, act 3 variants change the
    // selected asset and the transformation for it
    const actThreeModifier = this.isActThree ? "act_3_" : "";

    return (
      `l_Inscryber:Costs:v2:${actThreeModifier}${filename}_${rareModifier}${value}/` +
      `t_${actThreeModifier}cost/`
    );
  }
}
