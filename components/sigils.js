import React, { useState, useEffect } from "react";
import Select from "react-select";

const Sigils = (props) => {
  const [sigil, setSigil] = useState("");

  const options = [
    { value: "", label: "No sigils" },
    { value: "sigils/airborne", label: "Airborne" },
    { value: "sigils/bifurcated_strike", label: "Bifurcated Strike" },
  ];

  useEffect(() => {
    console.log(sigil);
  }, [sigil]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <Select
        options={options}
        isSearchable
        onChange={(e) => {
          setSigil(e.value);
        }}
      />
    </section>
  );
};

export default Sigils;
