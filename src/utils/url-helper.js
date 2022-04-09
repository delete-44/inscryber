import { TransformationFactory } from "src/transformation-factory";
import { CARD_BASE, CLOUDINARY_BASE } from "components/constants";

/**
 * Generate a complete card URL from given transformations.
 *
 * @param {String}  [cardBase=vladde]               Base card background to apply transformations to.
 * @param {Object}  transformations                 An object containing all transformations to add.
 * @param {string}  transformations.name            "Name" of the card, written at the top.
 * @param {string}  transformations.power           "Power" of the card, bottom left.
 * @param {string}  transformations.health          "Health" of the card, bottom right.
 * @param {Object}  transformations.cost            Details on costs transformation.
 * @param {string}  transformations.cost.currency   Currency of the cost to be shown, ie blood/bones/energy.
 * @param {string}  transformations.cost.value      Numerical value of the cost.
 * @param {array}   transformations.sigils          Array of strings, the filenames of sigils to apply.
 *
 * @return {String} A valid cloudinary URL for the transformed image.
 */
export const generateUrl = (transformations = {}, cardBase = "vladde") => {
  let tfString = "";

  for (const type in transformations) {
    let tf = TransformationFactory.build(type, transformations[type]);

    tfString += tf.toString();
  }

  return `${CLOUDINARY_BASE}${tfString}${CARD_BASE}${cardBase}`;
};
