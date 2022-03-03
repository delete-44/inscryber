import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SIGILS } from "components/constants";
import MultiSelect from "components/multi-select";

const Sigils = (props) => {
  const [sigil, setSigil] = useState(null);
  const [sigils, setSigils] = useState([]);
  const { setSigilsTF } = props;

  const options = [
    ...SIGILS.map((s) => {
      return {
        value: `Inscryption:ResizedSigils:${s.filename}`,
        label: s.label,
      };
    }),
  ];

  useEffect(() => {
    sigil === null || sigil.value === ""
      ? setSigilsTF("")
      : setSigilsTF(`l_${sigil.value}/fl_layer_apply,g_south,y_64/`);
  }, [sigil, setSigilsTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <MultiSelect
        id="sigils"
        options={options}
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
