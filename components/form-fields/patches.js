import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SIGILS } from "components/constants";
import MultiSelect from "components/multi-select";

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

  useEffect(() => {
    if (patches.length === 0) {
      setPatchesTF("");
      return;
    }

    // Build array of selected values,
    // ie ["Inscryption:ResizedPatches:airborne", "Inscryption:ResizedPatches:stinky"]
    const patchValues = patches.map((p) => p.value);
    let transformation = "";

    // Declare transformations for each patch
    const patchTransformations = [
      "t_patch_1/",
      "fl_layer_apply,g_west,y_10,x_48/",
      "fl_layer_apply,g_east,y_-96,x_28/",
      "a_-20/fl_layer_apply,g_north,x_64/",
    ];

    // Create full TF from individual sigil transformations declared
    // in patchTransformations. Each line pertains to a patch
    patchValues.forEach((p, i) => {
      transformation += `l_${p}/t_patch_${i + 1}/`;
    });

    setPatchesTF(transformation);
  }, [patches, setPatchesTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Or <label htmlFor="patches">patches</label>? I won&apos;t ask where
        from...
      </p>

      <MultiSelect
        id="patches"
        options={options}
        maxOptions={4}
        setSelected={setPatches}
        selected={patches}
      />
    </section>
  );
};

Patches.propTypes = {
  setPatchesTF: PropTypes.func.isRequired,
};

export default Patches;
