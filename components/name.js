import React, { useState } from "react";
import PropTypes from "prop-types";

const Name = (props) => {
  const [name, setName] = useState("");
  const [timer, setTimer] = useState(null);
  const { setNameTF } = props;

  // Stagger requests so they only send 500ms after user stops typing
  const nameChanged = (e) => {
    setName(e.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      // If name is empty, clear transformation to save load on API
      name === ""
        ? setNameTF("")
        : setNameTF(
            `l_text:v1644177732:Inscryption:HEAVYWEIGHT.ttf_84:${encodeURIComponent(
              e.target.value
            )},g_north,y_64,w_600,c_fit,h_80/`
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
