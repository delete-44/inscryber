import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { SIGILS, SELECT_STYLES, SELECT_THEME } from "components/constants";

const Patches = (props) => {
  const [patch, setPatch] = useState("");
  const { setPatchesTF } = props;

  const options = [
    { value: "", label: "No patches" },
    ...SIGILS.map((s) => {
      return {
        value: `Inscryption:ResizedPatches:${s.filename}`,
        label: s.label,
      };
    }),
  ];

  useEffect(() => {
    patch === ""
      ? setPatchesTF("")
      : setPatchesTF(`l_${patch}/fl_layer_apply,g_north_west,y_148,x_32/`);
  }, [patch, setPatchesTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Or <label htmlFor="patches">patches</label>? I won't ask where from...
      </p>

      <Select
        instanceId="patches-selector"
        aria-label="patches"
        options={options}
        isSearchable
        styles={SELECT_STYLES}
        theme={SELECT_THEME}
        onChange={(e) => {
          setPatch(e.value);
        }}
      />
    </section>
  );
};

Patches.propTypes = {
  setPatchesTF: PropTypes.func.isRequired,
};

export default Patches;