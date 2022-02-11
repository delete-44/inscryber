import React, { useState, useEffect } from "react";
import Select from "react-select";

const Sigils = (props) => {
  const [sigil, setSigil] = useState("");
  const { setSigilsTF } = props;

  const options = [
    { value: "", label: "No sigils" },
    { value: "v1644605839:Inscryption:Sigils:airborne", label: "Airborne" },
    { value: "v1644605839:Inscryption:Sigils:bifurcated_strike", label: "Bifurcated Strike" },
  ];

  useEffect(() => {
    sigil === ""
      ? setSigilsTF("")
      : setSigilsTF(`l_${sigil}.png,g_south,y_64/`);
  }, [sigil]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <Select
        instanceId="sigils-selector"
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
