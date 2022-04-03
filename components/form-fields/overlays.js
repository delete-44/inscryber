import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TRIBES } from "components/constants";
import MultiCheckbox from "components/multi-checkbox";

const Overlays = (props) => {
  const [selectedOverlays, setSelectedOverlays] = useState([]);
  const { setOverlaysTF } = props;

  // MultiCheckbox component sets selectedOverlays as
  // an array of filenames
  useEffect(() => {
    if (selectedOverlays.length === 0) {
      setOverlaysTF("");
      return;
    }

    // Apply each one in a transformation
    let transformation = "";

    // Add transformation for each tribe. Transformations
    // are named in Cloudinary in the form tribe_x
    selectedOverlays.forEach((o) => {
      transformation += `l_Inscryber:Overlays:v1:${o}/`;
    });

    setOverlaysTF(transformation);
  }, [selectedOverlays, setOverlaysTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Do you require any <label htmlFor="overlays">overlays</label>?
      </p>

      <MultiCheckbox
        options={TRIBES}
        setSelectedFilenames={setSelectedOverlays}
        formName="overlays"
      />
    </section>
  );
};

Overlays.propTypes = {
  setOverlaysTF: PropTypes.func.isRequired,
};

export default Overlays;
