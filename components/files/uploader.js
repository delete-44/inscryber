import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { CLOUDINARY_API_BASE } from "components/constants";
import Spinner from "components/spinner";
import ErrorFlash from "components/error-flash";

const Uploader = (props) => {
  const [image, setImage] = useState("");
  const { setImageId } = props;

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

  useEffect(() => {
    async function updatePortrait() {
      if (image === "") {
        setImageId("");
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
        setImageId(uploaded.public_id.replace(/\//g, ":"));
        setBusy(false);
      } catch (e) {
        console.error(e);

        setError(true);
        setBusy(false);
      }
    }

    updatePortrait();
  }, [image, setImageId]);

  return (
    <section>
      <span className="inline-flex justify-between w-full">
        <p className="mb-3">
          Finally... a <label htmlFor="portrait">portrait</label>.
        </p>

        <Spinner hidden={!busy} />
      </span>

      <input
        type="file"
        id="portrait"
        accept="image/*"
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

Uploader.propTypes = {
  setImageId: PropTypes.func.isRequired,
};

export default Uploader;
