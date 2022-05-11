import React, { useState } from "react";
import {
  CARD_BASE,
  CLOUDINARY_BASE,
  CARD_WIDTH,
  CARD_HEIGHT,
} from "components/constants";
import Form from "components/form";
import GridLayout from "layouts/grid-layout";
import ImagePreview from "components/image-preview";

export default function Home() {
  // State management for this component
  const [busy, setBusy] = useState(true);
  const [cardBase, setCardBase] = useState("vladde");
  const [url, setUrl] = useState(
    `${CLOUDINARY_BASE}c_scale,h_${CARD_HEIGHT},w_${CARD_WIDTH}/${CARD_BASE}blur`
  );

  return (
    <GridLayout
      title="Inscryber | Inscryption Card Generator"
      heading="Inscryber"
      cardBase={cardBase}
    >
      {/* Left column */}
      <Form
        setBusy={setBusy}
        setUrl={setUrl}
        cardBase={cardBase}
        setCardBase={setCardBase}
      />

      {/* Right column */}
      <ImagePreview setBusy={setBusy} busy={busy} url={url} />
    </GridLayout>
  );
}
