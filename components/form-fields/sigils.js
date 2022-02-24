import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { SIGILS, SELECT_STYLES, SELECT_THEME } from "components/constants";

const Sigils = (props) => {
  const [sigil, setSigil] = useState("");
  const { setSigilsTF } = props;

  const options = [
    { value: "", label: "No sigils" },
    ...SIGILS.map((s) => {
      return {
        value: `Inscryption:ResizedSigils:${s.filename}`,
        label: s.label,
      };
    }),
  ];

  useEffect(() => {
    sigil === ""
      ? setSigilsTF("")
      : setSigilsTF(`l_${sigil}/fl_layer_apply,g_south,y_64/`);
  }, [sigil, setSigilsTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <Select
        instanceId="sigils-selector"
        aria-label="sigils"
        options={options}
        isSearchable
        styles={SELECT_STYLES}
        theme={SELECT_THEME}
        onChange={(e) => {
          setSigil(e.value);
        }}
      />
    </section>
  );
};

Sigils.propTypes = {
  setSigilsTF: PropTypes.func.isRequired,
};

export default Sigils;
