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
    console.log(selectedTribes);
    // Retrieve checked tribes
    // Sort them alphabetically for consistency
    // Apply each on in a transformation
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
