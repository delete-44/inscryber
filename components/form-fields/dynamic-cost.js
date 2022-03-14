import { CURRENCIES } from "components/constants";
import React, { useState } from "react";

const DynamicCost = (props) => {
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("blood");
  const { setCostTF } = props;

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
    </section>
  );
};

export default DynamicCost;
