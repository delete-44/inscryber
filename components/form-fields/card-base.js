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
        {BASES.map(({ filename, label }) => {
          return (
            <div key={filename}>
              <input
                type="radio"
                name="card-base"
                id={filename}
                checked={props.value === filename}
                onChange={() => {
                  setValue(filename);
                }}
              />
              <label htmlFor={filename} className="text-xl md:text-2xl">
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
