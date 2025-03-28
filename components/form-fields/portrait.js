import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import FormFieldLayout from "layouts/form-field-layout";
import Uploader from "components/files/uploader";
import Inscryber from "components/files/inscryber";
import Link from "next/link";

const Portrait = (props) => {
  const [imageId, setImageId] = useState("");
  const [inscrybedTFs, setInscrybedTFs] = useState([]);
  const { setPortraitTF } = props;

  useEffect(() => {
    setPortraitTF(
      imageId === ""
        ? {}
        : { portrait: { filename: imageId, manipulations: inscrybedTFs } }
    );
  }, [imageId, inscrybedTFs, setPortraitTF]);

  return (
    <FormFieldLayout>
      <Uploader setImageId={setImageId} />

      <small>
        Please review how we handle images in the privacy section of our{" "}
        <Link href="/about">
          about page
        </Link>{" "}
        before uploading.
        <br />
        For best results, use an image 656x514px or larger, with a transparent
        background.
        <br />
        Images are <strong>not</strong> scaled up to fill this. If your image
        seems small, manually scale it up using &quot;Nearest Neighbour&quot;.
      </small>

      <Inscryber setInscrybedTFs={setInscrybedTFs} />
    </FormFieldLayout>
  );
};

Portrait.propTypes = {
  setPortraitTF: PropTypes.func.isRequired,
};

export default Portrait;
