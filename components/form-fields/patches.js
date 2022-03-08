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

    // Add transformation for each sigil. Transformations
    // are named in Cloudinary in the form patch_x
    patchValues.forEach((p, i) => {
      transformation += `l_${p}/t_patch_${++i}/`;
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
