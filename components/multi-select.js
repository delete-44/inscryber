import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { SELECT_STYLES, SELECT_THEME } from "components/constants";

const MultiSelect = (props) => {
  const { id, options, maxOptions, setSelected } = props;

  return (
    <>
      {/* noOptions solution by @hrafaelveloso - https://github.com/JedWatson/react-select/issues/1341#issuecomment-521195152 */}
      <Select
        instanceId={`${id}-selector`}
        aria-label={id}
        options={props.selected.length === maxOptions ? [] : options}
        noOptionsMessage={() => {
          return props.selected.length === maxOptions
            ? `Only ${maxOptions} ${id} can be applied at once.`
            : "No options available.";
        }}
        isSearchable
        isMulti
        styles={SELECT_STYLES}
        theme={SELECT_THEME}
        value={props.selected}
        onChange={(e) => {
          // Allow maximum of 4 options to be selected
          if (e.length <= maxOptions) {
            setSelected(e);
          }
        }}
      />

      <small className="text-orange-100">{maxOptions} maximum</small>
    </>
  );
};

MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  maxOptions: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default MultiSelect;
