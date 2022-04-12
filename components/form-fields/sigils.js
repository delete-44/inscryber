import React from "react";
import PropTypes from "prop-types";
import MultiSelect from "components/multi-select";

const Sigils = (props) => {
  const { setSigilsTF } = props;

  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      <MultiSelect id="sigils" maxOptions={2} setTF={setSigilsTF} />
    </section>
  );
};

Sigils.propTypes = {
  setSigilsTF: PropTypes.func.isRequired,
};

export default Sigils;
