import React, { useEffect, useState } from "react";
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

    console.log(checkedTribes);

    if (checkedTribes.length === 0) {
      setTribesTF("");
      return;
    }

    // Apply each one in a transformation
    let transformation = "";

    // Declare transformations for each tribe
    const tribeTransformations = [
      "fl_layer_apply,g_north_west,y_148,x_32/",
      "fl_layer_apply,g_west,y_10,x_48/",
      "fl_layer_apply,g_east,y_-96,x_28/",
      "a_-20/fl_layer_apply,g_north,x_64/",
    ];

    // Create full TF from individual tribe transformations declared
    // in tribeTransformations. Each line pertains to a tribe
    checkedTribes.forEach((p, i) => {
      transformation += `l_Inscryption:ResizedTribes:${p}/${tribeTransformations[i]}`;
    });

    setTribesTF(transformation);
  }, [selectedTribes]);

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

export default Tribes;
