import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MultiCheckbox from "components/multi-checkbox";
import { PORTRAIT_MANIPULATIONS } from "components/constants";

const Inscryber = (props) => {
  const [selectedManipulations, setSelectedManipulations] = useState([]);
  const { setInscrybedTFs } = props;

  // selectedManipulations comes in as an array of transformations
  // If any of these are present, chain them with "/" characters
  // If not, remove the transformation completely
  useEffect(() => {
    setInscrybedTFs(
      selectedManipulations.length > 0
        ? `${selectedManipulations.join("/")}/`
        : ""
    );
  }, [selectedManipulations, setInscrybedTFs]);

  return (
    <MultiCheckbox
      options={PORTRAIT_MANIPULATIONS}
      setSelectedFilenames={setSelectedManipulations}
      formName="tribes"
    />
  );
};

Inscryber.propTypes = {
  setInscrybedTFs: PropTypes.func.isRequired,
};

export default Inscryber;
