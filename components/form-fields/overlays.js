import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OVERLAYS } from "components/constants";
import MultiCheckbox from "components/multi-checkbox";

const Overlays = (props) => {
  const [selectedOverlays, setSelectedOverlays] = useState([]);
  const { setOverlaysTF } = props;

  // MultiCheckbox component sets selectedOverlays as
  // an array of filenames
  useEffect(() => {
    console.log(selectedOverlays);
    setOverlaysTF(
      selectedOverlays.length < 1 ? {} : { overlays: selectedOverlays }
    );
  }, [selectedOverlays, setOverlaysTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        ...Or have any <label htmlFor="overlays">overlays</label>?
      </p>

      <MultiCheckbox
        options={OVERLAYS}
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
