import React from "react";
import { BASES } from "components/constants";

const CardBase = (props) => {
  const { setValue } = props;
  return (
    <section className="mb-10">
      <p className="mb-3">
        Which <label htmlFor="card-base">card base</label> do you want?
      </p>

      <span className="inline-flex w-full md:w-4/6 justify-between">
        {BASES.map(({ value, label }) => {
          return (
            <div key={value}>
              <input
                type="radio"
                name="card-base"
                id={value}
                checked={props.value === value}
                onChange={() => {
                  setValue(value);
                }}
              />
              <label htmlFor={value} className="text-xl md:text-2xl">
                {label}
              </label>
            </div>
          );
        })}
      </span>
    </section>
  );
};

export default CardBase;
