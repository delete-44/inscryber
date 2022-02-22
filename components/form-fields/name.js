import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { HEAVYWEIGHT } from "components/constants";

const Name = (props) => {
  const [name, setName] = useState("");
  const { setNameTF } = props;

  useEffect(() => {
    // If name is empty, clear transformation to save load on API
    name === ""
      ? setNameTF("")
      : setNameTF(
          `l_text:${HEAVYWEIGHT}_128:` +
            `${encodeURIComponent(name)},` +
            `${
              name.length < 12
                ? "w_560,h_115,c_fit/fl_layer_apply,y_48,g_north/"
                : "w_580,h_75,c_scale/fl_layer_apply,y_64,g_north/"
            }`
        );
  }, [name, setNameTF]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Tell me this creature&apos;s <label htmlFor="name">name</label>.
      </p>

      <input
        type="text"
        placeholder="Stoat"
        aria-label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </section>
  );
};

Name.propTypes = {
  setNameTF: PropTypes.func.isRequired,
};

export default Name;
