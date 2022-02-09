import React, { useState } from "react";
import PropTypes from "prop-types";
import { HEAVYWEIGHT } from "./constants";

const Name = (props) => {
  const [name, setName] = useState("");
  const [timer, setTimer] = useState(null);
  const { setNameTF } = props;

  // Stagger requests so they only send 500ms after user stops typing
  const nameChanged = (e) => {
    const newName = e.target.value;

    setName(newName);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      // If name is empty, clear transformation to save load on API
      newName === ""
        ? setNameTF("/")
        : setNameTF(
            `l_text:${HEAVYWEIGHT}_96:` +
              `${encodeURIComponent(newName)}` +
              `,g_north,y_64,w_600,h_90,c_` +
              `${newName.length < 8 ? "fit" : "scale"}/`
          );
    }, 500);

    setTimer(newTimer);
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
