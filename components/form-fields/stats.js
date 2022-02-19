import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HEAVYWEIGHT } from "components/constants";

const Stats = (props) => {
  const [power, setPower] = useState("");
  const [health, setHealth] = useState("");
  const { setPowerTF, setHealthTF } = props;

  useEffect(() => {
    power === ""
      ? setPowerTF("")
      : setPowerTF(
          `l_text:${HEAVYWEIGHT}_204:` +
            `${encodeURIComponent(power)},` +
            `g_south_west,x_72,y_164,c_scale,` +
            `w_${power.length < 2 ? "50" : "100"}/`
        );
  }, [power, setPowerTF]);

  useEffect(() => {
    health === ""
      ? setHealthTF("")
      : setHealthTF(
          `l_text:${HEAVYWEIGHT}_204:` +
            `${encodeURIComponent(health)},` +
            `g_south_east,x_60,y_86,c_scale,` +
            `w_${health.length < 2 ? "50" : "100"}/`
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
