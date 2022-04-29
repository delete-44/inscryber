import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MultiCheckbox = (props) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const { setSelectedFilenames } = props;

  // selected initialises as an empty object.
  // As values are selected, they get added in the form
  // filename: isSelected?
  // Use a !! to set a forced true/false solution when
  // querying if the filename is selected
  useEffect(() => {
    // Retrieve sorted array of checked items, ie
    // Create array of keys from the object where
    // the value for that key is "true"
    setSelectedFilenames(
      Object.keys(selectedOptions)
        .filter((k) => selectedOptions[k])
        .sort()
    );
  }, [setSelectedFilenames, selectedOptions]);

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
              checked={!!selectedOptions[filename]}
              onChange={(e) => {
                setSelectedOptions({
                  ...selectedOptions,
                  [filename]: e.target.checked,
                });
              }}
              disabled={props.readonly}
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

MultiCheckbox.propTypes = {
  options: PropTypes.array.isRequired,
  setSelectedFilenames: PropTypes.func.isRequired,
  formName: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
};

export default MultiCheckbox;
