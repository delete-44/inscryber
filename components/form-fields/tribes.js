import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TRIBES } from "components/constants";
import MultiCheckbox from "components/multi-checkbox";

const Tribes = (props) => {
  const [selectedTribes, setSelectedTribes] = useState([]);
  const { setTribesTF } = props;

  useEffect(() => {
    if (selectedTribes.length === 0) {
      setTribesTF("");
      return;
    }

    // Apply each one in a transformation
    let transformation = "";

    // Add transformation for each tribe. Transformations
    // are named in Cloudinary in the form tribe_x
    selectedTribes.forEach((t, i) => {
      transformation += `l_Inscryber:Tribes:v1:${t}/t_tribe_${++i}/`;
    });

    setTribesTF(transformation);
  }, [selectedTribes, setTribesTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature belong to any <label htmlFor="tribes">tribes</label>?
      </p>

      <MultiCheckbox
        options={TRIBES}
        setSelectedOptions={setSelectedTribes}
        formName="tribes"
      />
    </section>
  );
};

Tribes.propTypes = {
  setTribesTF: PropTypes.func.isRequired,
};

export default Tribes;
