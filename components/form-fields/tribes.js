import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FormFieldLayout from "layouts/form-field-layout";
import { TRIBES } from "components/constants";
import MultiCheckbox from "components/multi-checkbox";

const Tribes = (props) => {
  const [selectedTribes, setSelectedTribes] = useState([]);
  const { setTribesTF } = props;

  // MultiCheckbox component sets selectedTribes as
  // an array of filenames
  useEffect(() => {
    setTribesTF(selectedTribes.length < 1 ? {} : { tribes: selectedTribes });
  }, [selectedTribes, setTribesTF]);

  return (
    <FormFieldLayout>
      <p className="mb-3">
        Does it belong to any <label htmlFor="tribes">tribes</label>?
      </p>

      <MultiCheckbox
        options={TRIBES}
        setSelectedFilenames={setSelectedTribes}
        formName="tribes"
      />
    </FormFieldLayout>
  );
};

Tribes.propTypes = {
  setTribesTF: PropTypes.func.isRequired,
};

export default Tribes;
