import React from "react";
import PropTypes from "prop-types";
import { BASES } from "components/constants";

const CardBase = (props) => {
  const { setBase } = props;
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
                checked={props.base === filename}
                onChange={() => {
                  setBase(filename);
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

CardBase.propTypes = {
  setBase: PropTypes.func.isRequired,
  base: PropTypes.string.isRequired,
};

export default CardBase;
