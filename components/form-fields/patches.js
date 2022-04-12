import React from "react";
import PropTypes from "prop-types";
import MultiSelect from "components/multi-select";

const Patches = (props) => {
  const { setPatchesTF } = props;

  return (
    <section className="mb-10">
      <p className="mb-3">
        Or <label htmlFor="patches">patches</label>? I won&apos;t ask where
        from...
      </p>

      <MultiSelect id="patches" maxOptions={4} setTF={setPatchesTF} />
    </section>
  );
};

Patches.propTypes = {
  setPatchesTF: PropTypes.func.isRequired,
};

export default Patches;
