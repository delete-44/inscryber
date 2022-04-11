import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { generateUrl } from "src/utils/url-helper.js";
import {
  CARD_BASE,
  CLOUDINARY_BASE,
  DEBOUNCE_TIMER,
} from "components/constants";

import Name from "@form-fields/name";
import Stats from "@form-fields/stats";
import Sigils from "@form-fields/sigils";
import Portrait from "@form-fields/portrait";
import Patches from "@form-fields/patches";
import CardBase from "@form-fields/card-base";
import Tribes from "@form-fields/tribes";
import Overlays from "@form-fields/overlays";
import DynamicCost from "@form-fields/dynamic-cost";

const Form = (props) => {
  // Transformations to be applied to the image
  const [nameTF, setNameTF] = useState({});
  const [powerTF, setPowerTF] = useState("");
  const [healthTF, setHealthTF] = useState("");
  const [sigilsTF, setSigilsTF] = useState("");
  const [portraitTF, setPortraitTF] = useState("");
  const [patchesTF, setPatchesTF] = useState("");
  const [tribesTF, setTribesTF] = useState("");
  const [overlaysTF, setOverlaysTF] = useState("");
  const [costTF, setCostTF] = useState("");
  const [cardBase, setCardBase] = useState("vladde");

  const { setBusy, setUrl } = props;

  // Stagger requests so they wait for a delay, defined
  // in CONSTANTs, from user input before requesting new image
  useEffect(() => {
    const timer = setTimeout(() => {
      setBusy(true);

      // Compile all transformations into one string
      // Order this array by layers, ie the first element
      // will appear under all others, the last element
      // will appear over.
      const transformations = [
        portraitTF,
        tribesTF,
        // costTF,
        // nameTF,
        // powerTF,
        // healthTF,
        sigilsTF,
        overlaysTF,
        patchesTF,
      ].join("");

      const transformationObject = {
        ...costTF,
        ...nameTF,
        ...powerTF,
        ...healthTF,
      };

      console.log("TFObject: ", transformationObject);

      setUrl(generateUrl(transformationObject));
    }, DEBOUNCE_TIMER);
    return () => clearTimeout(timer);
  }, [
    nameTF,
    powerTF,
    healthTF,
    sigilsTF,
    portraitTF,
    patchesTF,
    tribesTF,
    overlaysTF,
    costTF,
    cardBase,
    setBusy,
    setUrl,
  ]);

  return (
    <div>
      {/* Name form field */}
      <Name setNameTF={setNameTF} />

      {/* Power & health form fields */}
      <Stats setPowerTF={setPowerTF} setHealthTF={setHealthTF} />

      {/* Cost form fields - number field & radio buttons for currencies */}
      <DynamicCost setCostTF={setCostTF} />

      {/* Sigils form field */}
      <Sigils setSigilsTF={setSigilsTF} />

      {/* Patches form field */}
      <Patches setPatchesTF={setPatchesTF} />

      {/* Tribes form fields */}
      <Tribes setTribesTF={setTribesTF} />

      {/* Overlays form fields */}
      <Overlays setOverlaysTF={setOverlaysTF} />

      {/* Card back selector, ie rarity */}
      <CardBase base={cardBase} setBase={setCardBase} />

      <Portrait setPortraitTF={setPortraitTF} />
    </div>
  );
};

Form.propTypes = {
  setBusy: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default Form;
