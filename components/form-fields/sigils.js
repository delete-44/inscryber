import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SIGILS } from "components/constants";
import MultiSelect from "components/multi-select";

const Sigils = (props) => {
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
    if (sigils.length === 0) {
      setSigilsTF("");
      return;
    }

    // Single sigils are larger and central than multiple sigils
    if (sigils.length === 1) {
      setSigilsTF(`l_${sigils[0].value}/fl_layer_apply,g_south,y_64/`);
      return;
    }

    // Build array of selected values,
    // ie ["Inscryption:ResizedSigils:airborne", "Inscryption:ResizedSigils:stinky"]
    const sigilValues = sigils.map((p) => p.value);
    let transformation = "";

    const commonTransformations = "w_180,c_scale/fl_layer_apply,g_south,";
    // Declare transformations for each patch
    const sigilTransformations = [
      `${commonTransformations}y_39,x_-75/`,
      `${commonTransformations}y_150,x_75/`,
    ];

    // Create full TF from individual sigil transformations declared
    // in sigilTransformations. Each line pertains to a patch
    sigilValues.forEach((p, i) => {
      transformation += `l_${p}/${sigilTransformations[i]}`;
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
