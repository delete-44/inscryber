import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormFieldLayout from "layouts/form-field-layout";

const Stats = (props) => {
  const [power, setPower] = useState("");
  const [health, setHealth] = useState("");
  const { setPowerTF, setHealthTF } = props;

  useEffect(() => {
    setPowerTF(power ? { power: power } : {});
  }, [power, setPowerTF]);

  useEffect(() => {
    setHealthTF(health ? { health: health } : {});
  }, [health, setHealthTF]);

  return (
    <FormFieldLayout>
      <p className="mb-3">
        How about their <label htmlFor="power">power</label> and{" "}
        <label htmlFor="health">health</label>?
      </p>

      <section className="grid grid-cols-2 gap-10 md:w-3/6 w-full">
        <input
          type="number"
          aria-label="Power"
          name="power"
          value={power}
          onChange={(e) => {
            setPower(e.target.value);
          }}
        />

        <input
          type="number"
          aria-label="Health"
          name="health"
          value={health}
          onChange={(e) => {
            setHealth(e.target.value);
          }}
        />
      </section>
    </FormFieldLayout>
  );
};

Stats.propTypes = {
  setPowerTF: PropTypes.func.isRequired,
};

export default Stats;
