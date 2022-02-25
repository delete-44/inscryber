import React from "react";

const CardBase = (props) => {
  const { setValue } = props;
  return (
    <section className="mb-10">
      <p className="mb-3">
        Which <label htmlFor="card-base">base card</label> do you choose?
      </p>

      <span className="inline-flex w-full md:w-3/6 justify-between">
        <div>
          <input
            type="radio"
            name="card-base"
            id="normal"
            checked={props.value === "vladde"}
            onChange={() => {
              setValue("vladde");
            }}
          />
          <label htmlFor="normal">Normal</label>
        </div>

        <div>
          <input
            type="radio"
            name="card-base"
            id="rare"
            checked={props.value === "rare"}
            onChange={() => {
              setValue("rare");
            }}
          />
          <label htmlFor="rare">Rare</label>
        </div>

        <div>
          <input
            type="radio"
            name="card-base"
            id="unsacrificable"
            checked={props.value === "unsacrificable"}
            onChange={() => {
              setValue("unsacrificable");
            }}
          />
          <label htmlFor="unsacrificable">Unsacrificable</label>
        </div>
      </span>
    </section>
  );
};

export default CardBase;
