import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HEAVYWEIGHT } from "components/constants";

const Stats = (props) => {
  const [power, setPower] = useState("");
  const [health, setHealth] = useState("");
  const { setPowerTF, setHealthTF } = props;

  const getWidth = (stat) => {
    if (stat === "1") return 50;

    if (stat.length < 3) return 50 + stat.length * 15;

    return 100;
  };

  useEffect(() => {
    power === ""
      ? setPowerTF("")
      : setPowerTF(
          `l_text:${HEAVYWEIGHT}_196:` +
            `${encodeURIComponent(power)},` +
            `c_scale,w_${getWidth(power)}` +
            `/t_power/`
        );
  }, [power, setPowerTF]);

  useEffect(() => {
    health === ""
      ? setHealthTF("")
      : setHealthTF(
          `l_text:${HEAVYWEIGHT}_196:` +
            `${encodeURIComponent(health)},` +
            `c_scale,w_${getWidth(health)}` +
            `/t_health/`
        );
  }, [health, setHealthTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        How about their <label htmlFor="power">power</label> and{" "}
        <label htmlFor="health">health</label>?
      </p>

      <section className="grid grid-cols-2 gap-10 md:w-2/6 w-full">
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
    </section>
  );
};

Stats.propTypes = {
  setPowerTF: PropTypes.func.isRequired,
};

export default Stats;
