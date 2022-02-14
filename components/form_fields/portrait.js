import React, { useState, useEffect } from "react";
import { CLOUDINARY_API_BASE } from "components/constants";
import Spinner from "components/spinner";
import ErrorFlash from "components/error-flash";

const Portrait = (props) => {
  const [image, setImage] = useState("");
  const { setPortraitTF } = props;

  // State management for form component
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  // Queries the cloudinary API to upload an image. If successful,
  // will return an object containing a url key that we can use.
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

    try {
      setBusy(true);
      setError(false);
      const uploaded = await upload(image);

      // Public ID is returned with "/" characters. As we are only using
      // the image for transformations, we replace them with ":"
      // Sizing & fitting for the image is done on upload, handled by
      // cloudinary, to save storage. Only need to position image in this TF.
      setPortraitTF(`l_${uploaded.public_id.replace(/\//g, ":")}.webp,y_-80/`);
      setBusy(false);
    } catch (e) {
      console.log(e);

      setError(true);
      setBusy(false);
    }
  }, [image]);

  return (
    <section>
      <span className="inline-flex justify-between w-full">
        <p className="mb-3">
          Finally... a <label htmlFor="portrait">portrait</label>.
        </p>

        <Spinner hidden={!busy} />
      </span>

      <input
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-orange-100 bg-clip-padding border border-solid border-gray-300 rounded"
        type="file"
        id="portrait"
        disabled={busy}
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      <ErrorFlash
        hidden={!error}
        message="Please try again. If the error persists, use a different image"
      />
    </section>
  );
};

export default Portrait;
