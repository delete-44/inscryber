import React from "react";

const Sigils = (props) => {
  return (
    <section className="mb-10">
      <p className="mb-3">
        Does this creature have any <label htmlFor="sigils">sigils</label>?
      </p>

      {/* THIS IS NOT FINAL, but a good indicator of size */}
      <input
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-orange-100 bg-clip-padding border border-solid border-gray-300 rounded"
        type="file"
        id="portrait"
      />
    </section>
  );
};

export default Sigils;
