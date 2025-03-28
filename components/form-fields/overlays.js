import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormFieldLayout from "layouts/form-field-layout";
import { OVERLAYS } from "components/constants";
import MultiCheckbox from "components/multi-checkbox";

const Overlays = (props) => {
  const [selectedOverlays, setSelectedOverlays] = useState([]);
  const { setOverlaysTF } = props;

  // MultiCheckbox component sets selectedOverlays as
  // an array of filenames
  useEffect(() => {
    setOverlaysTF(
      selectedOverlays.length < 1 ? {} : { overlays: selectedOverlays }
    );
  }, [selectedOverlays, setOverlaysTF]);

  return (
    <FormFieldLayout readonly={props.readonly}>
      <p className="mb-3">
        ...Or have any <label htmlFor="overlays">overlays</label>?
      </p>

      <MultiCheckbox
        options={OVERLAYS}
        setSelectedFilenames={setSelectedOverlays}
        formName="overlays"
        readonly={props.readonly}
      />
    </FormFieldLayout>
  );
};

Overlays.propTypes = {
  setOverlaysTF: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
};

export default Overlays;
