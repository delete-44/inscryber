import React, { useState, useEffect } from "react";
import Uploader from "components/files/uploader";
import Inscryber from "components/files/inscryber";
import PropTypes from "prop-types";
import Link from "next/link";

const Portrait = (props) => {
  const [imageId, setImageId] = useState("");
  const [inscrybed, setInscrybed] = useState(false);
  const { setPortraitTF } = props;

  useEffect(() => {
    if (imageId === "") {
      setPortraitTF("");
      return;
    }

    inscrybed
      ? setPortraitTF(`e_pixelate:6,l_${imageId},y_-80/`)
      : setPortraitTF(`l_${imageId},y_-80/`);
    8;
  }, [imageId, inscrybed]);

  return (
    <section>
      <Uploader setImageId={setImageId} />

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

      <Inscryber inscrybed={inscrybed} setInscrybed={setInscrybed} />
    </section>
  );
};

Portrait.propTypes = {
  setPortraitTF: PropTypes.func.isRequired,
};

export default Portrait;
