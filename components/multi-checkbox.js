import React, { useState, useEffect } from "react";

const MultiCheckbox = (props) => {
  const [selected, setSelected] = useState({});
  const { setSelectedOptions } = props;

  // selected initialises as an empty object.
  // As values are selected, they get added in the form
  // filename: isSelected?
  // Use a !! to set a forced true/false solution when
  // querying if the filename is selected
  useEffect(() => {
    // Retrieve sorted array of checked items, ie
    // Create array of keys from the object where
    // the value for that key is "true"
    setSelectedOptions(
      Object.keys(selected)
        .filter((k) => selected[k])
        .sort()
    );
  }, [setSelectedOptions, selected]);

  return (
    <span className="grid grid-cols-2 md:grid-cols-3 w-full md:w-5/6">
      {props.options.map(({ filename, label }) => {
        return (
          <div key={filename}>
            <input
              type="checkbox"
              name={props.formName}
              id={filename}
              className="peer"
              checked={!!selected[filename]}
              onChange={(e) => {
                setSelected({
                  ...selected,
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
  );
};

export default MultiCheckbox;
