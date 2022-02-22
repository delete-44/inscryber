import React, { useState, useEffect } from "react";
import Uploader from "components/portrait/uploader";
import PropTypes from "prop-types";
import Link from "next/link";

const Portrait = (props) => {
  const { setPortraitTF } = props;

  return (
    <section>
      <Uploader />

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
