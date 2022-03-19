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
import Link from "next/link";

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

        <Link href={url}>
          <a
            target="_blank"
            className={`mx-auto mt-2 text-4xl ${busy ? "hidden" : ""}`}
          >
            Open Full Image
          </a>
        </Link>

        <small className="text-orange-100 text-center mt-2">
          The preview image on this page is 75% the size of the full image. To
          retrieve the full resolution version, use the link above.
        </small>
      </div>
    </GridLayout>
  );
}
