import { CURRENCIES } from "components/constants";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const DynamicCost = (props) => {
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("blood");
  const { setCostTF } = props;

  useEffect(() => {
    // Remove transformation if card is free
    if (cost === "" || cost < 1) {
      setCostTF("");
      return;
    }

    // For as long as we have valid assets, use them - for
    // blood this is 1-4, bones 1-3

    // For single-character costs, use the narrow background
    if (cost < 10) {
      setCostTF(
        `t_v2_${currency}-bg-narrow/` +
          `l_Inscryber:Costs:v2:${currency}:${cost}/t_v2_cost-unit/`
      );
      return;
    }

    // For costs < 20, use a small background and decrease the padding
    // around the "1"

    // For two-character costs, use wide background
    setCostTF(
      `t_v2_${currency}-bg-wide/` +
        `l_Inscryber:Costs:v2:${currency}:${String(cost[0])}/t_v2_cost-ten/` +
        `l_Inscryber:Costs:v2:${currency}:${String(cost[1])}/t_v2_cost-unit/`
    );
  }, [cost, currency, setCostTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        And every creature has a <label htmlFor="power">cost</label>
        ...
      </p>

      <section className="grid grid-cols-2 gap-10 md:w-3/6 w-full">
        <input
          type="number"
          aria-label="Cost"
          name="cost"
          className="my-2"
          value={cost}
          onChange={(e) => {
            // Accepted values are from 0 (free) to 99, as we support
            // max. 2 chars of cost.
            if (e.target.value >= 0 && e.target.value < 100) {
              setCost(e.target.value);
            }
          }}
        />

        <div>
          {CURRENCIES.map((type) => {
            return (
              <div className="form-check" key={type.filename}>
                <input
                  type="radio"
                  name="cost-radio"
                  id={type.filename}
                  className="peer"
                  checked={currency == type.filename}
                  onChange={() => setCurrency(type.filename)}
                />

                <label htmlFor={type.filename} className="check-label">
                  {type.label}
                </label>
              </div>
            );
          })}
        </div>
      </section>

      <small className="text-orange-100">0 minimum, 99 maximum</small>
    </section>
  );
};

DynamicCost.propTypes = {
  setCostTF: PropTypes.func.isRequired,
};

export default DynamicCost;