import React, { useState } from "react";
import { blurUrl } from "src/utils/url-helper.js";
import Form from "components/form";
import GridLayout from "layouts/grid-layout";
import ImagePreview from "components/image-preview";

export default function Home() {
  // State management for this component
  const [busy, setBusy] = useState(true);
  const [cardBase, setCardBase] = useState("vladde");
  const [url, setUrl] = useState(blurUrl());

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
