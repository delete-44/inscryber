import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  SIGILS,
  GRIMORA_SIGILS,
  MAGNIFICUS_SIGILS,
  PO3_SIGILS,
  KAYCEE_SIGILS,
  ADDITIONAL_SIGILS,
} from "components/constants";

import { styleBuilder, themeBuilder } from "components/multi-select-theme";

const MultiSelect = (props) => {
  const [selected, setSelected] = useState([]);
  const [theme, setTheme] = useState("orange");
  const { id, maxOptions, setTF } = props;

  const options = [
    { label: "Leshy", options: SIGILS },
    { label: "Grimora", options: GRIMORA_SIGILS },
    { label: "Magnificus", options: MAGNIFICUS_SIGILS },
    { label: "PO3", options: PO3_SIGILS },
    { label: "Kaycee", options: KAYCEE_SIGILS },
    { label: "Additional", options: ADDITIONAL_SIGILS },
  ];

  useEffect(() => {
    if (selected.length === 0 || props.readonly) {
      setTF({});
      return;
    }

    // Build array of selected values,
    // ie ["airborne", "stinky"]
    const selectedValues = selected.map((p) => p.value);
    setTF({ [id]: selectedValues });
  }, [selected, setTF]);

  useEffect(() => {
    if (props.readonly) {
      setTheme("neutral");
    } else if (props.cardBase === "botopia") {
      setTheme("blue");
    } else {
      setTheme("orange");
    }
  }, [props.readonly, props.cardBase, setTheme]);

  return (
    <>
      {/* noOptions solution by @hrafaelveloso - https://github.com/JedWatson/react-select/issues/1341#issuecomment-521195152 */}
      <Select
        instanceId={`${id}-selector`}
        aria-label={id}
        options={selected.length === maxOptions ? [] : options}
        noOptionsMessage={() => {
          return selected.length === maxOptions
            ? `Only ${maxOptions} ${id} can be applied at once.`
            : "No options available.";
        }}
        isSearchable
        isMulti
        styles={styleBuilder(theme)}
        theme={themeBuilder(theme)}
        value={selected}
        onChange={(e) => {
          // Cap maximum that can be selected at once
          if (e.length <= maxOptions) {
            setSelected(e);
          }
        }}
        isDisabled={props.readonly}
      />

      <small>{maxOptions} maximum</small>
    </>
  );
};

MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  maxOptions: PropTypes.number.isRequired,
  setTF: PropTypes.func.isRequired,
  cardBase: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
};

export default MultiSelect;
