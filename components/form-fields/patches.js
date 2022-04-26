import React from "react";
import PropTypes from "prop-types";
import MultiSelect from "components/multi-select";

const Patches = (props) => {
  const { setPatchesTF } = props;

  return (
    <section className="mb-10">
      <p className="mb-3">
        Or <label htmlFor="patches">patches</label>? I won&apos;t ask how...
      </p>

      <MultiSelect
        id="patches"
        maxOptions={4}
        setTF={setPatchesTF}
        cardBase={props.cardBase}
      />
    </section>
  );
};

Patches.propTypes = {
  setPatchesTF: PropTypes.func.isRequired,
  cardBase: PropTypes.string.isRequired,
};

export default Patches;
