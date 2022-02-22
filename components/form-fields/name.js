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
            `${encodeURIComponent(name)},g_north,` +
            `${
              name.length < 12
                ? "y_48,w_560,h_115,c_fit/"
                : "y_64,w_580,h_75,c_scale/"
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
