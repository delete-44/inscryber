import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { generateUrl } from "src/utils/url-helper.js";
import { DEBOUNCE_TIMER } from "components/constants";

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

  const { setBusy, setUrl, setCardBase } = props;

  useEffect(
    () => {
        const transformations = [
          nameTF,
          powerTF,
          healthTF,
          sigilsTF,
          portraitTF,
          patchesTF,
          tribesTF,
          overlaysTF,
          costTF,
        ];

      // Stagger requests so they wait for a delay, defined
      // in CONSTANTs, from user input before requesting new image
      const timer = setTimeout(() => {
        setBusy(true);

        // Merge array of transformation objects into one large object
        const transformationObject = Object.assign({}, ...transformations);

        setUrl(generateUrl(transformationObject, props.cardBase));
      }, DEBOUNCE_TIMER);
      return () => clearTimeout(timer);
    },
    // Add every transformation to the dependency array for this hook
    [
      props.cardBase,
      setBusy,
      setUrl,
      nameTF,
      powerTF,
      healthTF,
      sigilsTF,
      portraitTF,
      patchesTF,
      tribesTF,
      overlaysTF,
      costTF,
    ]
  );

  return (
    <div>
      {/* Name form field */}
      <Name setNameTF={setNameTF} />

      {/* Power & health form fields */}
      <Stats setPowerTF={setPowerTF} setHealthTF={setHealthTF} />

      {/* Cost form fields - number field & radio buttons for currencies */}
      <DynamicCost setCostTF={setCostTF} />

      {/* Sigils form field */}
      <Sigils setSigilsTF={setSigilsTF} cardBase={props.cardBase} />

      {/* Patches form field */}
      <Patches
        setPatchesTF={setPatchesTF}
        cardBase={props.cardBase}
        readonly={props.cardBase === "botopia"}
      />

      {/* Tribes form fields */}
      <Tribes
        setTribesTF={setTribesTF}
        readonly={props.cardBase === "botopia"}
      />

      {/* Overlays form fields */}
      <Overlays
        setOverlaysTF={setOverlaysTF}
        readonly={props.cardBase === "botopia"}
      />

      {/* Card back selector, ie rarity */}
      <CardBase base={props.cardBase} setBase={setCardBase} />

      <Portrait setPortraitTF={setPortraitTF} />
    </div>
  );
};

Form.propTypes = {
  setBusy: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired,
  setCardBase: PropTypes.func.isRequired,
  cardBase: PropTypes.string.isRequired,
};

export default Form;
