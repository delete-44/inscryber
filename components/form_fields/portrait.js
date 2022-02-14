import React, { useState, useEffect } from "react";

const Portrait = (props) => {
  const [image, setImage] = useState("");
  const { setPortraitTF } = props;

  useEffect(async () => {
    console.log(image);
  }, [image]);

  return (
    <section>
      <p className="mb-3">
        Finally... a <label htmlFor="portrait">portrait</label>.
      </p>

      <input
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-orange-100 bg-clip-padding border border-solid border-gray-300 rounded"
        type="file"
        id="portrait"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
    </section>
  );
};

export default Portrait;
