import React from "react";
import Select from "react-select";

const Sigils = (props) => {
  const options = [
    { value: "sigils/airborne", label: "Airborne" },
    { value: "sigils/bifurcated_strike", label: "Bifurcated Strike" },
  ];

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      < Select options={options} onChange={} />
    </section>
  );
};

export default Sigils;
