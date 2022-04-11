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

    // Build array of selected values,
    // ie ["airborne", "stinky"]
    const sigilValues = sigils.map((p) => p.value);
    setSigilsTF({ sigils: sigilValues });
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
