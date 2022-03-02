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

    // Declare transformations for each tribe
    const tribeTransformations = [
      "o_30/fl_layer_apply,g_north_west,y_32/",
      "o_30/fl_layer_apply,g_north,y_32/",
      "o_30/fl_layer_apply,g_north_east,y_32/",
      "o_30/fl_layer_apply,g_east,y_96,x_96/",
      "o_30/fl_layer_apply,g_west,y_96,x_96/",
    ];

    // Create full TF from individual tribe transformations declared
    // in tribeTransformations. Each line pertains to a tribe
    checkedTribes.forEach((t, i) => {
      transformation += `l_Inscryption:ResizedTribes:${t}/${tribeTransformations[i]}`;
    });

    setTribesTF(transformation);
  }, [selectedTribes, setTribesTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature belong to any <label htmlFor="tribes">tribes</label>?
      </p>

      <span className="flex flex-wrap w-full md:w-4/6 ">
        {TRIBES.map(({ filename, label }) => {
          return (
            <div key={filename} className="w-2/6">
              <input
                type="checkbox"
                name="tribes"
                id={filename}
                checked={!!selectedTribes[filename]}
                onChange={(e) => {
                  setSelectedTribes({
                    ...selectedTribes,
                    [filename]: e.target.checked,
                  });
                }}
              />
              <label htmlFor={filename} className="text-xl md:text-2xl">
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
