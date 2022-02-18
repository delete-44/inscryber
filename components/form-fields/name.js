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
            `g_north,y_48,w_600,h_116,` +
            `c_${name.length < 10 ? "fit" : "scale"}/`
        );
  }, [name]);

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
