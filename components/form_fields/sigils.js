import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { SIGILS } from "components/constants";

const Sigils = (props) => {
  const [sigil, setSigil] = useState("");
  const { setSigilsTF } = props;

  const options = [
    { value: "", label: "No sigils" },
    ...SIGILS.map((s) => {
      return {
        value: `Inscryption:Sigils:${s.filename}`,
        label: s.label,
      };
    }),
  ];

  const selectStyles = {
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "#424242",
      };
    },
    control: (defaultStyles) => {
      return {
        ...defaultStyles,
        backgroundColor: "#fff1e7",
        fontSize: "1.875rem",
        borderBottom: "2px solid #cc6f33",
      };
    },
    singleValue: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "black"
      }
    }
  };

  useEffect(() => {
    sigil === ""
      ? setSigilsTF("")
      : setSigilsTF(`l_${sigil}.png,g_south,y_64/`);
  }, [sigil]);

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <Select
        instanceId="sigils-selector"
        aria-label="sigils"
        options={options}
        isSearchable
        styles={selectStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
          ...theme.colors,
            primary25: '#fff1e7',
            primary: '#cc6f33',
          },
        })}
        onChange={(e) => {
          setSigil(e.value);
        }}
      />
    </section>
  );
};

Sigils.propTypes = {
  setSigilsTF: PropTypes.func.isRequired,
};

export default Sigils;
