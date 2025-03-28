import React, { useState } from "react";
import Link from "next/link";
import Spinner from "components/spinner";
import Image from "next/legacy/image";
import ErrorFlash from "components/error-flash";
import { CARD_WIDTH, CARD_HEIGHT } from "components/constants";

const ImagePreview = (props) => {
  const { setBusy } = props;
  const [error, setError] = useState(false);

  return (
    <div className="width-full md:mt-0 h-min top-8 relative sticky flex flex-col items-center justify-center mt-16">
      <Spinner hidden={!props.busy} />

      <ErrorFlash
        hidden={!error}
        message="We had problems inscrybing this. Try updating your card, and get in touch if this persists."
      />

      <Image
        src={props.url}
        alt="A preview of your custom card"
        width={props.busy ? 0 : CARD_WIDTH * 0.6}
        height={props.busy ? 0 : CARD_HEIGHT * 0.6}
        objectFit="contain"
        objectPosition="center top"
        priority
        onLoad={() => {
          setBusy(false);
          setError(false);
        }}
        onError={() => {
          console.error(`Could not generate ${props.url}`);

          setError(true);
          setBusy(false);
        }}
      />

      <Link
        href={props.url}
        target="_blank"
        className={`mx-auto mt-8 mb-2 text-center ${
          props.busy || error ? "hidden" : ""
        }`}
        tabIndex={-1}
        passHref
      >
          <button>Download Image</button>
      </Link>
    </div>
  );
};

export default ImagePreview;
