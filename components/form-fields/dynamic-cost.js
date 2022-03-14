import React from "react";

const DynamicCost = (props) => {
  return (
    <section className="mb-10">
      <p className="mb-3">
        And every creature has a <label htmlFor="power">cost</label>
        ...
      </p>

      <section className="grid grid-cols-2 gap-10 md:w-2/6 w-full">
        <input
          type="number"
          min="0"
          aria-label="Cost"
          name="cost"
          className="w-1/2"
        />

        <div>
          <div className="form-check">
            <input
              type="radio"
              name="cost-radio"
              id="blood"
              defaultChecked
              className="peer"
            />

            <label htmlFor="blood" className="check-label">
              Blood
            </label>
          </div>

          <div className="form-check">
            <input type="radio" name="cost-radio" id="bones" className="peer" />

            <label htmlFor="bones" className="check-label">
              Bones
            </label>
          </div>
        </div>
      </section>
    </section>
  );
};

export default DynamicCost;
