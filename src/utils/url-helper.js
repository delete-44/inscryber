import { TransformationFactory } from "src/transformation-factory";
import { CARD_BASE, CLOUDINARY_BASE } from "components/constants";

/**
 * Generate a complete card URL from given transformations.
 *
 * @param {String}  [cardBase=vladde]                       Base card background to apply transformations to.
 * @param {Object}  transformations                         An object containing all transformations to add.
 * @param {string}  transformations.name                    "Name" of the card, written at the top.
 * @param {string}  transformations.power                   "Power" of the card, bottom left.
 * @param {string}  transformations.health                  "Health" of the card, bottom right.
 * @param {Object}  transformations.cost                    Details on costs transformation.
 * @param {string}  transformations.cost.currency           Currency of the cost to be shown, ie blood/bones/energy.
 * @param {string}  transformations.cost.value              Numerical value of the cost.
 * @param {array}   transformations.sigils                  Array of strings, the filenames of sigils to apply.
 * @param {array}   transformations.patches                 Array of strings, the filenames of patches to apply.
 * @param {array}   transformations.tribes                  Array of strings, the filenames of tribes to apply.
 * @param {array}   transformations.overlays                Array of strings, the filenames of overlays to apply.
 * @param {Object}  transformations.portrait                Details on the portrait to add
 * @param {string}  transformations.portrait.filename       Filename of the uploaded pic
 * @param {array}   transformations.portrait.manipulations  Array of strings, which filters to apply.
 *
 * @return {String} A valid cloudinary URL for the transformed image.
 */
export const generateUrl = (transformations = {}, cardBase = "vladde") => {
  let tfString = "";

  transformationLayers.forEach((layer) => {
    if (transformations[layer]) {
      let tf = TransformationFactory.build(layer, transformations[layer]);

      tfString += tf.toString();
    }
  });

  return `${CLOUDINARY_BASE}${tfString}${CARD_BASE}${cardBase}`;
};

// Order in which to apply transformation layers
// Item at the beginning of the array is added first,
// and will render under everything else. Item at the
// end will render over the top of everything else
const transformationLayers = [
  "portrait",
  "tribes",
  "cost",
  "name",
  "power",
  "health",
  "sigils",
  "overlays",
  "patches",
];
