import React from "react";

const Spinner = (props) => {
  return (
    <div
      className={`spinner-border animate-spin inline-block w-8 h-8 border-4 border-orange-400 rounded-full border-r-transparent ${
        props.hidden ? "hidden" : ""
      }`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
