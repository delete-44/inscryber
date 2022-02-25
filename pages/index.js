import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CARD_BASE, CLOUDINARY_BASE, DEBOUNCE_TIMER } from "components/constants";
import Name from "@form-fields/name";
import Stats from "@form-fields/stats";
import Sigils from "@form-fields/sigils";
import Portrait from "@form-fields/portrait";
import Patches from "@form-fields/patches";
import CardBase from "@form-fields/card-base";
import Spinner from "components/spinner";
import GridLayout from "layouts/grid-layout";

export default function Home() {
  // State management for this component
  const [url, setUrl] = useState(`${CLOUDINARY_BASE}${CARD_BASE}vladde`);
  const [busy, setBusy] = useState(true);

  // Transformations to be applied to the image
  const [nameTF, setNameTF] = useState("");
  const [powerTF, setPowerTF] = useState("");
  const [healthTF, setHealthTF] = useState("");
  const [sigilsTF, setSigilsTF] = useState("");
  const [portraitTF, setPortraitTF] = useState("");
  const [patchesTF, setPatchesTF] = useState("");

  const [cardBase, setCardBase] = useState("vladde");

  // Stagger requests so they only send 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusy(true);
      const transformations = [
        nameTF,
        powerTF,
        healthTF,
        sigilsTF,
        portraitTF,
        patchesTF,
      ].join("");
      setUrl(`${CLOUDINARY_BASE}${transformations}${CARD_BASE}${cardBase}`);
    }, DEBOUNCE_TIMER);
    return () => clearTimeout(timer);
  }, [nameTF, powerTF, healthTF, sigilsTF, portraitTF, patchesTF, cardBase]);

  return (
    <GridLayout
      title="Inscryber | Inscryption Card Generator"
      heading="Inscryber"
    >
      {/* Left column */}
      <div>
        {/* Name form field */}
        <Name setNameTF={setNameTF} />

        {/* Power & health form fields */}
        <Stats setPowerTF={setPowerTF} setHealthTF={setHealthTF} />

        {/* Sigils form field */}
        <Sigils setSigilsTF={setSigilsTF} />

        {/* Patches form field */}
        <Patches setPatchesTF={setPatchesTF} />

        {/* Card back selector, ie rarity */}
        <CardBase value={cardBase} setValue={setCardBase} />

        <Portrait setPortraitTF={setPortraitTF} />
      </div>

      {/* Right column */}
      <div className="width-full flex justify-center items-center relative mt-16 md:mt-0 h-80 md:h-auto">
        <Spinner hidden={!busy} />

        <Image
          src={url}
          alt="A preview of your custom card"
          width={0}
          height={0}
          layout={busy ? 0 : "fill"}
          objectFit="contain"
          priority
          onLoadingComplete={() => {
            setBusy(false);
          }}
        />
      </div>
    </GridLayout>
  );
}
