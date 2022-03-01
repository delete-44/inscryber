import React from "react";
import { TRIBES } from "components/constants";

const Tribes = (props) => {
  const { setTribesTF } = props;

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature belong to any <label htmlFor="tribes">tribes</label>?
      </p>

      <span className="flex flex-wrap w-full md:w-4/6 justify-between">
        {TRIBES.map(({ filename, label }) => {
          return (
            <div key={filename} className="w-auto md:w-2/6">
              <input
                type="checkbox"
                name="tribes"
                id={filename}
                checked={props.value === filename}
                onChange={() => {
                  // setValue(filename);
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

export default Tribes;
