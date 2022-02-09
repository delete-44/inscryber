import React, { useState } from "react";
import { HEAVYWEIGHT } from "./constants";

const Stats = (props) => {
  const [power, setPower] = useState();
  const [timer, setTimer] = useState(null);
  const { setPowerTF } = props;

  // Stagger requests so they only send 500ms after user stops typing
  const powerChanged = (e) => {
    setPower(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      e.target.value === ""
        ? setPowerTF("")
        : setPowerTF(
            `l_text:${HEAVYWEIGHT}_156:` +
              `${encodeURIComponent(e.target.value)},` +
              `g_south_west,x_64,y_164,w_100,h_156,` +
              `c_${e.target.value.length < 2 ? "fit" : "scale"}/`
          );
    }, 500);

    setTimer(newTimer);
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

        <input type="number" min="1" aria-label="Health" name="health" />
      </section>
    </section>
  );
};

export default Stats;
