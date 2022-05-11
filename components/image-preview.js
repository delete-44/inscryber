import React, { useState } from "react";
import Link from "next/link";
import Spinner from "components/spinner";
import Image from "next/image";
import ErrorFlash from "components/error-flash";
import { CARD_WIDTH, CARD_HEIGHT } from "components/constants";

const ImagePreview = (props) => {
  const { setBusy } = props;
  const [error, setError] = useState(false);

  return (
    <div className="width-full flex flex-col justify-center relative mt-16 md:mt-0 h-min sticky top-8">
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
        onLoadingComplete={() => {
          setBusy(false);
          setError(false);
        }}
        onError={() => {
          console.error(`Could not generate ${props.url}`);

          setError(true);
          setBusy(false);
        }}
      />

      <Link href={props.url}>
        <a
          target="_blank"
          className={`mx-auto mt-8 mb-2 text-center ${
            props.busy || error ? "hidden" : ""
          }`}
          tabIndex={-1}
        >
          <button>Download Image</button>
        </a>
      </Link>
    </div>
  );
};

export default ImagePreview;
