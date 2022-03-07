import Image from "next/image";
import React, { useState } from "react";
import {
  CARD_BASE,
  CLOUDINARY_BASE,
  CARD_WIDTH,
  CARD_HEIGHT,
} from "components/constants";
import Form from "components/form";
import Spinner from "components/spinner";
import GridLayout from "layouts/grid-layout";

export default function Home() {
  // State management for this component
  const [busy, setBusy] = useState(true);
  const [url, setUrl] = useState(
    `${CLOUDINARY_BASE}c_scale,h_${CARD_HEIGHT},w_${CARD_WIDTH}/${CARD_BASE}blur`
  );

  return (
    <GridLayout
      title="Inscryber | Inscryption Card Generator"
      heading="Inscryber"
    >
      {/* Left column */}
      <Form setBusy={setBusy} setUrl={setUrl} />

      {/* Right column */}
      <div className="width-full flex flex-col justify-center relative mt-16 md:mt-0 h-min sticky top-4">
        <Spinner hidden={!busy} />

        <Image
          src={url}
          alt="A preview of your custom card"
          width={busy ? 0 : CARD_WIDTH * 0.75}
          height={busy ? 0 : CARD_HEIGHT * 0.75}
          objectFit="contain"
          objectPosition="center top"
          priority
          onLoadingComplete={() => {
            setBusy(false);
          }}
        />

        <small className="text-orange-100 text-center mt-2">
          To download this image, right click (or long press on mobile devices)
          and select "Save Image As".
        </small>
      </div>
    </GridLayout>
  );
}
