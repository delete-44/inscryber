import React from "react";
import PropTypes from "prop-types";

const ErrorFlash = ({
  hidden,
  message = "Something went wrong! Please try again.",
}) => {
  return (
    <div
      className={`border border-red text-red px-3 py-1.5 my-2 rounded relative ${
        hidden ? "hidden" : ""
      }`}
      role="alert"
    >
      <strong className="mr-2 font-bold">Error:</strong>
      <span className="sm:inline block">{message}</span>
    </div>
  );
};

ErrorFlash.propTypes = {
  hidden: PropTypes.bool.isRequired,
  message: PropTypes.string,
};

export default ErrorFlash;
