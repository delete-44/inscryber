import React, { useState } from "react";
import PropTypes from "prop-types";
import { HEAVYWEIGHT } from "./constants";

const Stats = (props) => {
  const [power, setPower] = useState("");
  const [health, setHealth] = useState("");
  const { setPowerTF, setHealthTF } = props;

  const powerChanged = (e) => {
    const newPower = e.target.value;
    setPower(newPower);

    newPower === ""
      ? setPowerTF("")
      : setPowerTF(
          `l_text:${HEAVYWEIGHT}_156:` +
            `${encodeURIComponent(newPower)},` +
            `g_south_west,x_64,y_164,w_100,h_156,` +
            `c_${newPower.length < 2 ? "fit" : "scale"}/`
        );
  };

  const healthChanged = (e) => {
    const newHealth = e.target.value;
    setHealth(newHealth);

    newHealth === ""
      ? setHealthTF("")
      : setHealthTF(
          `l_text:${HEAVYWEIGHT}_156:` +
            `${encodeURIComponent(newHealth)},` +
            `g_south_east,x_64,y_56,w_100,h_156,` +
            `c_${newHealth.length < 2 ? "fit" : "scale"}/`
        );
  };

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
          onChange={powerChanged}
        />

        <input
          type="number"
          aria-label="Health"
          name="health"
          value={health}
          onChange={healthChanged}
        />
      </section>
    </section>
  );
};

Stats.propTypes = {
  setPowerTF: PropTypes.func.isRequired,
};

export default Stats;
