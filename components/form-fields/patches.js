import React from "react";
import PropTypes from "prop-types";
import FormFieldLayout from "layouts/form-field-layout";
import MultiSelect from "components/multi-select";

const Patches = (props) => {
  const { setPatchesTF } = props;

  return (
    <FormFieldLayout readonly={props.readonly}>
      <p className="mb-3">
        Or <label htmlFor="patches">patches</label>? I won&apos;t ask how...
      </p>

      <MultiSelect
        id="patches"
        maxOptions={4}
        setTF={setPatchesTF}
        cardBase={props.cardBase}
        readonly={props.readonly}
      />
    </FormFieldLayout>
  );
};

Patches.propTypes = {
  setPatchesTF: PropTypes.func.isRequired,
  cardBase: PropTypes.string.isRequired,
  readonly: PropTypes.bool,
};

export default Patches;
