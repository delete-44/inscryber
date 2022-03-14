import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { TRIBES } from "components/constants";

const Tribes = (props) => {
  const [selectedTribes, setSelectedTribes] = useState({});
  const { setTribesTF } = props;

  // selectedTribes initialises as an empty object.
  // As values are selected, they get added in the form
  // filename: isSelected?
  // Use a !! to set a forced true/false solution when
  // querying if the filename is selected
  useEffect(() => {
    // Retrieve sorted array of checked tribes, ie
    // Create array of keys from the object where
    // the value for that key is "true"
    const checkedTribes = Object.keys(selectedTribes)
      .filter((k) => selectedTribes[k])
      .sort();

    if (checkedTribes.length === 0) {
      setTribesTF("");
      return;
    }

    // Apply each one in a transformation
    let transformation = "";

    // Add transformation for each tribe. Transformations
    // are named in Cloudinary in the form tribe_x
    checkedTribes.forEach((t, i) => {
      transformation += `l_Inscryber:Tribes:v1:${t}/t_tribe_${++i}/`;
    });

    setTribesTF(transformation);
  }, [selectedTribes, setTribesTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature belong to any <label htmlFor="tribes">tribes</label>?
      </p>

      <span className="grid grid-cols-2 md:grid-cols-3 w-full md:w-5/6">
        {TRIBES.map(({ filename, label }) => {
          return (
            <div key={filename}>
              <input
                type="checkbox"
                name="tribes"
                id={filename}
                className="peer"
                checked={!!selectedTribes[filename]}
                onChange={(e) => {
                  setSelectedTribes({
                    ...selectedTribes,
                    [filename]: e.target.checked,
                  });
                }}
              />
              <label htmlFor={filename} className="check-label">
                {label}
              </label>
            </div>
          );
        })}
      </span>
    </section>
  );
};

Tribes.propTypes = {
  setTribesTF: PropTypes.func.isRequired,
};

export default Tribes;
