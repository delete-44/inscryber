import React, { useState, useEffect } from "react";

export default function Name(props) {
  const [name, setName] = useState("Stoat");
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
      <p className="text-5xl text-orange-400 font-title text-shadow-orange mb-3">
        Tell me this creature&apos;s{" "}
        <label htmlFor="name" className="text-red text-shadow-red">
          name
        </label>
        .
      </p>

      <input
        className="bg-orange-100 border-b-2 border-orange-400 w-full p-2 text-4xl focus:outline-none focus:bg-white text-black"
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
