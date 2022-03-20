import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PORTRAIT_MANIPULATIONS } from "components/constants";
import MultiCheckbox from "components/multi-checkbox";

const Inscryber = (props) => {
  const [selectedManipulations, setSelectedManipulations] = useState([]);
  const { setInscrybedTFs } = props;

  useEffect(() => {
    setInscrybedTFs(selectedManipulations.join("/"));
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
  inscrybed: PropTypes.bool.isRequired,
  setInscrybedTFs: PropTypes.func.isRequired,
};

export default Inscryber;
