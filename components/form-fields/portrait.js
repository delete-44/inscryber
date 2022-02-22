import React, { useState, useEffect } from "react";
import { CLOUDINARY_API_BASE } from "components/constants";
import Spinner from "components/spinner";
import ErrorFlash from "components/error-flash";
import PropTypes from "prop-types";
import Link from "next/link";

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

  useEffect(() => {
    async function updatePortrait() {
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
        setPortraitTF(
          `l_${uploaded.public_id.replace(/\//g, ":")}/fl_layer_apply,y_-80/`
        );
        setBusy(false);
      } catch (e) {
        console.log(e);

        setError(true);
        setBusy(false);
      }
    }

    updatePortrait();
  }, [image, setPortraitTF]);

  return (
    <section>
      <span className="inline-flex justify-between w-full">
        <p className="mb-3">
          Finally... a <label htmlFor="portrait">portrait</label>.
        </p>

        <Spinner hidden={!busy} />
      </span>

      <input
        className="w-full border-2 border-orange-100 border-b-orange-400 px-3 py-1.5 text-base font-normal text-gray-700 bg-orange-100 bg-clip-padding rounded-sm"
        type="file"
        id="portrait"
        accept="image/*"
        disabled={busy}
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />

      <small className="text-orange-100 text-left">
        Please review how we handle images in the privacy section of our{" "}
        <Link href="/about">
          <a>about page</a>
        </Link>{" "}
        before uploading.
        <br />
        Images are scaled to fit dimensions 624x512. For best results, use an
        image at least this size, with a transparent background.
        <br />
      </small>

      <ErrorFlash
        hidden={!error}
        message="Please try again. If the error persists, use a different image"
      />

      <input type="checkbox" name="costRadio" id="inscrybe-image" />

      <label htmlFor="inscrybe-image" className="align-super">
        Inscrybe Image
      </label>
    </section>
  );
};

Portrait.propTypes = {
  setPortraitTF: PropTypes.func.isRequired,
};

export default Portrait;
