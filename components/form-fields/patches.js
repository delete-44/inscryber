import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { SIGILS, SELECT_STYLES, SELECT_THEME } from "components/constants";

const Patches = (props) => {
  const [patches, setPatches] = useState("");
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
    console.log(patches);
    // e.map((o) => o.value)

    // patch === ""
    //   ? setPatchesTF("")
    //   : setPatchesTF(`l_${patch}/fl_layer_apply,g_north_west,y_148,x_32/`);
  }, [patches, setPatchesTF]);

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
        isMulti
        styles={SELECT_STYLES}
        theme={SELECT_THEME}
        value={patches}
        onChange={(e) => {
          // Allow maximum of 4 options to be selected
          if (e.length < 5) {
            setPatches(e);
          }
        }}
      />
    </section>
  );
};

Patches.propTypes = {
  setPatchesTF: PropTypes.func.isRequired,
};

export default Patches;
