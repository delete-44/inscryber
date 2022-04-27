import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormFieldLayout from "layouts/form-field-layout";

const Name = (props) => {
  const [name, setName] = useState("");
  const { setNameTF } = props;

  useEffect(() => {
    setNameTF(name ? { name: name } : {});
  }, [name, setNameTF]);

  return (
    <FormFieldLayout>
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
    </FormFieldLayout>
  );
};

Name.propTypes = {
  setNameTF: PropTypes.func.isRequired,
};

export default Name;
