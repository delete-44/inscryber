import React, { useState, useEffect } from "react";

export default function Name(props) {
  const [name, setName] = useState("");
  const { setNameTF } = props;

  useEffect(() => {
    name === ""
      ? setNameTF("")
      : setNameTF(
          `l_text:v1644177732:Inscryption:HEAVYWEIGHT.ttf_72:${encodeURIComponent(
            name
          )},g_north,y_180/c_scale,`
        );
  }, [name]);

  return (
    <section className="mb-14">
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
}
