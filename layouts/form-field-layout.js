import React from "react";
import PropTypes from "prop-types";

const FormFieldLayout = ({ readonly = false, children}) => {
  return (
    <section
      className={`mb-10 ${readonly ? "readonly" : ""}`}
      aria-hidden={readonly}
    >
      {children}
    </section>
  );
};

FormFieldLayout.propTypes = {
  readonly: PropTypes.bool,
};

export default FormFieldLayout;
