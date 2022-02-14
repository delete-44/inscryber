import React from "react";

const Error = (props) => {
  return (
    <div
      className={`border border-red text-red px-3 py-1.5 mt-2 rounded relative ${
        props.hidden ? "hidden" : ""
      }`}
      role="alert"
    >
      <strong className="font-bold mr-2">Error:</strong>
      <span className="block sm:inline">
        {props.message || "Something went wrong! Please try again."}
      </span>
    </div>
  );
};

export default Error;
