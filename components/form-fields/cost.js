import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { COSTS, SELECT_STYLES, SELECT_THEME } from "components/constants";

const Cost = (props) => {
  const [cost, setCost] = useState(null);
  const { setCostTF } = props;

  const options = [
    { value: "", label: "Free" },
    ...COSTS.map((s) => {
      return {
        value: `Inscryption:ResizedCosts:${s.filename}`,
        label: s.label,
      };
    }),
  ];

  useEffect(() => {
    cost === null || cost.value === ""
      ? setCostTF("")
      : setCostTF(`l_${cost.value}/fl_layer_apply,g_north_east,x_32,y_110/`);
  }, [cost, setCostTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        There's always a <label htmlFor="cost">cost</label>...
      </p>

      <Select
        instanceId="cost-selector"
        aria-label="cost"
        options={options}
        isSearchable
        value={cost}
        styles={SELECT_STYLES}
        theme={SELECT_THEME}
        onChange={(e) => setCost(e)}
      />
    </section>
  );
};

Cost.propTypes = {
  setCostTF: PropTypes.func.isRequired,
};

export default Cost;
