import React from "react";
import PropTypes from "prop-types";

const FormField = (props) => {
  return <section className="mb-10">{props.children}</section>;
};

FormField.propTypes = {
  readonly: PropTypes.bool,
};

export default FormField;
