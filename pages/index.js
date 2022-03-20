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
      <div className="width-full flex flex-col justify-center relative mt-16 md:mt-0 h-min sticky top-24">
        <Spinner hidden={!busy} />

        <Image
          src={url}
          alt="A preview of your custom card"
          width={busy ? 0 : CARD_WIDTH * 0.6}
          height={busy ? 0 : CARD_HEIGHT * 0.6}
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
            className={`mx-auto mt-8 mb-2 text-3xl text-center ${
              busy ? "hidden" : ""
            }`}
          >
            <button className="bg-transparent hover:bg-orange-400 hover:text-black text-orange-100 font-semibold hover:text-white py-2 px-4 border border-orange-400 hover:border-transparent rounded">
              Full Image
            </button>
          </a>
        </Link>

        <small className="text-orange-100 mx-auto">Opens in new tab</small>
      </div>
    </GridLayout>
  );
}
