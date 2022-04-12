import { CURRENCIES } from "components/constants";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const DynamicCost = (props) => {
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const { setCostTF } = props;

  useEffect(() => {
    const { max, filename } = currency;

    // If switching to a currency with a lower max value,
    // ie blood to energy, it is possible to input a value
    // greater than the max. This eliminates that risk.
    if (cost > max) {
      setCost(max);
    }

    // Remove transformation if card is free
    if (cost === "" || cost < 1) {
      setCostTF({});
      return;
    }

    setCostTF({ cost: { currency: filename, value: cost } });
  }, [cost, currency, setCostTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        And every creature has a <label htmlFor="cost">cost</label>
        ...
      </p>

      <section className="grid grid-cols-2 gap-10 md:w-3/6 w-full">
        <input
          type="number"
          aria-label="Cost"
          name="cost"
          className="my-6"
          value={cost}
          onChange={(e) => {
            // Accepted values are from 0 (free) to 99, as we support
            // max. 2 chars of cost.
            if (e.target.value >= 0 && e.target.value <= currency.max) {
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
                  checked={currency.filename == type.filename}
                  onChange={() => setCurrency(type)}
                />

                <label htmlFor={type.filename} className="check-label">
                  {type.label}
                </label>
              </div>
            );
          })}
        </div>
      </section>

      <small>0 minimum, {currency.max} maximum</small>
    </section>
  );
};

DynamicCost.propTypes = {
  setCostTF: PropTypes.func.isRequired,
};

export default DynamicCost;
