import React from "react";
import PropTypes from "prop-types";

const FormFieldLayout = (props) => {
  return (
    <section
      className={`mb-10 ${props.readonly ? "readonly" : ""}`}
      aria-hidden={props.readonly}
    >
      {props.children}
    </section>
  );
};

FormFieldLayout.propTypes = {
  readonly: PropTypes.bool,
};

FormFieldLayout.defaultProps = {
  readonly: false,
};

export default FormFieldLayout;
