import React, { useState, useEffect } from "react";
import { CLOUDINARY_API_BASE } from "./constants";

const Portrait = (props) => {
  const [image, setImage] = useState("");
  const { setPortraitTF } = props;

  const upload = async (imgData) => {
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
  };

  useEffect(async () => {
    if (image === "") {
      setPortraitTF("");
      return;
    }

    const uploadedImage = await upload(image);

    // .url property provides a full public URL. As we only need the image
    // for transformation purposes, this strips the preceding cloudinary domain
    // & replaces the filename / characters with :'s
    const imageID = uploadedImage.url
      .replace(/http:\/\/res.cloudinary.com\/.*\/image\/upload\//, "")
      .replace(/\//g, ":");

    setPortraitTF(`l_${imageID},c_fit,h_512,w_624,y_-80/`);
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
