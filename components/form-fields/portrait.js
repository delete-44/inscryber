import React, { useState, useEffect } from "react";
import Uploader from "components/files/uploader";
import Inscryber from "components/files/inscryber";
import PropTypes from "prop-types";
import Link from "next/link";

const Portrait = (props) => {
  const [imageId, setImageId] = useState("");
  const [inscrybedTFs, setInscrybedTFs] = useState(false);
  const { setPortraitTF } = props;

  useEffect(() => {
    if (imageId === "") {
      setPortraitTF("");
      return;
    }

    setPortraitTF(`l_${imageId}/${inscrybedTFs}/t_portrait/`);
  }, [imageId, inscrybedTFs, setPortraitTF]);

  return (
    <section>
      <Uploader setImageId={setImageId} />

      <small>
        Please review how we handle images in the privacy section of our{" "}
        <Link href="/about">
          <a>about page</a>
        </Link>{" "}
        before uploading.
        <br />
        Images are scaled to fit dimensions 625x514. For best results, use an
        image at least this size, with a transparent background.
        <br />
      </small>

      <Inscryber
        inscrybedTFs={inscrybedTFs}
        setInscrybedTFs={setInscrybedTFs}
      />
    </section>
  );
};

Portrait.propTypes = {
  setPortraitTF: PropTypes.func.isRequired,
};

export default Portrait;
