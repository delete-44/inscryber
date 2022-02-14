import React from "react";
import PropTypes from "prop-types";

const ErrorFlash = (props) => {
  return (
    <div
      className={`border border-red text-red px-3 py-1.5 my-2 rounded relative ${
        props.hidden ? "hidden" : ""
      }`}
      role="alert"
    >
      <strong className="font-bold mr-2">Error:</strong>
      <span className="block sm:inline">{props.message}</span>
    </div>
  );
};

ErrorFlash.defaultProps = {
  message: "Something went wrong! Please try again.",
};

ErrorFlash.propTypes = {
  hidden: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default ErrorFlash;
