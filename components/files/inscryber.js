import React, { useState } from "react";
import PropTypes from "prop-types";
import { PORTRAIT_MANIPULATIONS } from "components/constants";
import MultiCheckbox from "components/multi-checkbox";

const Inscryber = (props) => {
  const [selectedManipulations, setSelectedManipulations] = useState([]);
  const { setInscrybed } = props;

  return (
    <MultiCheckbox
      options={PORTRAIT_MANIPULATIONS}
      setSelectedFilenames={setSelectedManipulations}
      formName="tribes"
    />
  );
};

Inscryber.propTypes = {
  inscrybed: PropTypes.bool.isRequired,
  setInscrybed: PropTypes.func.isRequired,
};

export default Inscryber;
