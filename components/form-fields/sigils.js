import React from "react";
import PropTypes from "prop-types";
import FormFieldLayout from "layouts/form-field-layout";
import MultiSelect from "components/multi-select";

const Sigils = (props) => {
  const { setSigilsTF } = props;

  return (
    <FormFieldLayout>
      <p className="mb-3">
        Does this creature bear any <label htmlFor="sigils">sigils</label>?
      </p>

      <MultiSelect
        id="sigils"
        maxOptions={4}
        setTF={setSigilsTF}
        cardBase={props.cardBase}
      />
    </FormFieldLayout>
  );
};

Sigils.propTypes = {
  setSigilsTF: PropTypes.func.isRequired,
  cardBase: PropTypes.string.isRequired,
};

export default Sigils;
