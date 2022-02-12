import React, { useState, useEffect } from "react";

const Portrait = (props) => {
  return (
    <section>
    <p className="mb-3">
      Finally... a <label htmlFor="portrait">portrait</label>.
    </p>

    <input
      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-orange-100 bg-clip-padding border border-solid border-gray-300 rounded"
      type="file"
      id="portrait"
    />
  </section>
  );
};

export default Portrait;
