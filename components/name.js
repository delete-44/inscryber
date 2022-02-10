import React, { useState } from "react";
import PropTypes from "prop-types";
import { HEAVYWEIGHT } from "./constants";

const Name = (props) => {
  const [name, setName] = useState("");
  const { setNameTF } = props;

  const nameChanged = (e) => {
    const newName = e.target.value;
    setName(newName);

    // If name is empty, clear transformation to save load on API
    newName === ""
      ? setNameTF("")
      : setNameTF(
          `l_text:${HEAVYWEIGHT}_128:` +
            `${encodeURIComponent(newName)},` +
            `g_north,y_48,w_600,h_116,` +
            `c_${newName.length < 10 ? "fit" : "scale"}/`
        );
  };

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
        onChange={nameChanged}
      />
    </section>
  );
};

Name.propTypes = {
  setNameTF: PropTypes.func.isRequired,
};

export default Name;
