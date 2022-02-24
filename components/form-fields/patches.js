import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { SIGILS, SELECT_STYLES, SELECT_THEME } from "components/constants";

const Patches = (props) => {
  const [patches, setPatches] = useState([]);
  const { setPatchesTF } = props;

  const options = [
    ...SIGILS.map((s) => {
      return {
        value: `Inscryption:ResizedPatches:${s.filename}`,
        label: s.label,
      };
    }),
  ];

  const patchTransformations = [
    "fl_layer_apply,g_north_west,y_148,x_32/",
    "fl_layer_apply,g_west,y_10,x_48/",
    "fl_layer_apply,g_east,y_-96,x_28/",
    "a_-20/fl_layer_apply,g_north,x_64/",
  ];

  useEffect(() => {
    if (patches.length === 0) {
      setPatchesTF("");
      return;
    }

    // Build array of selected values,
    // ie ["Inscryption:ResizedPatches:airborne", "Inscryption:ResizedPatches:stinky"]
    const patchValues = patches.map((p) => p.value);
    let transformation = "";

    // Create full TF from individual sigil transformations declared
    // in patchTransformations. Each line pertains to a patch
    patchValues.forEach((p, i) => {
      transformation += `l_${p}/${patchTransformations[i]}`;
    });

    setPatchesTF(transformation);
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
