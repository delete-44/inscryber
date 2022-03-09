import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MultiSelect from "components/multi-select";

const Patches = (props) => {
  const [patches, setPatches] = useState([]);
  const { setPatchesTF } = props;

  useEffect(() => {
    if (patches.length === 0) {
      setPatchesTF("");
      return;
    }

    // Build array of selected values,
    // ie ["airborne", "stinky"]
    const patchValues = patches.map((p) => p.value);
    let transformation = "";

    // Add transformation for each patch. Transformations
    // are named in Cloudinary in the form patch_x
    patchValues.forEach((p, i) => {
      transformation += `l_Inscryber:Patches:v1:${p}/t_patch_${++i}/`;
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
