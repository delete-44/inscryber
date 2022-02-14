import React, { useState, useEffect } from "react";
import { CLOUDINARY_API_BASE } from "components/constants";

const Portrait = (props) => {
  const [image, setImage] = useState("");
  const { setPortraitTF } = props;

  // Queries the cloudinary API to upload an image. If successful,
  // will return an object containing a url key that we can use.
  const upload = async (imgData) => {
    try {
      const formData = new FormData();
      formData.append("file", imgData);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );

      const response = await fetch(CLOUDINARY_API_BASE, {
        method: "post",
        body: formData,
      });

      return response.json();
    } catch (e) {
      // FIXME: Add proper error handling
      console.log(e);
    }
  };

  useEffect(async () => {
    if (image === "") return;

    const uploaded = await upload(image);

    console.log(uploaded);
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
