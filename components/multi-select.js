import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  SELECT_STYLES,
  SELECT_THEME,
  SIGILS,
  GRIMORA_SIGILS,
  MAGNIFICUS_SIGILS,
  PO3_SIGILS,
  KAYCEE_SIGILS,
} from "components/constants";

const MultiSelect = (props) => {
  const { id, maxOptions, setSelected } = props;

  const options = [
    { label: "Leshy", options: SIGILS },
    { label: "Grimora", options: GRIMORA_SIGILS },
    { label: "Magnificus", options: MAGNIFICUS_SIGILS },
    { label: "PO3", options: PO3_SIGILS },
    { label: "Kaycee", options: KAYCEE_SIGILS },
  ];

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

      <small>{maxOptions} maximum</small>
    </>
  );
};

MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  maxOptions: PropTypes.number.isRequired,
  setSelected: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default MultiSelect;
