import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiSelect from "components/multi-select";

const Sigils = (props) => {
  const [sigils, setSigils] = useState([]);
  const { setSigilsTF } = props;

  useEffect(() => {
    if (sigils.length === 0) {
      setSigilsTF("");
      return;
    }

    // Single sigils are larger and central than multiple sigils
    if (sigils.length === 1) {
      setSigilsTF(`l_Inscryber:Sigils:v1:${sigils[0].value}/t_sigil/`);
      return;
    }

    // Build array of selected values,
    // ie ["airborne", "stinky"]
    const sigilValues = sigils.map((p) => p.value);
    let transformation = "";

    // Add transformation for each sigil. Transformations
    // are named in Cloudinary in the form sigil_x
    sigilValues.forEach((s, i) => {
      transformation += `l_Inscryber:Sigils:v1:${s}/t_v1_sigil_${++i}/`;
    });

    setSigilsTF(transformation);
  }, [sigils, setSigilsTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <MultiSelect
        id="sigils"
        maxOptions={2}
        setSelected={setSigils}
        selected={sigils}
      />
    </section>
  );
};

Sigils.propTypes = {
  setSigilsTF: PropTypes.func.isRequired,
};

export default Sigils;
