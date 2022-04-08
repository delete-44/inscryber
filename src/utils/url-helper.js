import { TransformationFactory } from "../transformation-factory";
import { CARD_BASE, CLOUDINARY_BASE } from "components/constants";

/**
 * Generate a complete card URL from given transformations.
 *
 * @param {String}  [cardBase=vladde]     Base card background to apply transformations to.
 * @param {Object}  transformations       An object containing all transformations to add.
 * @param {string}  transformations.name  "Name" of the card, written at the top.
 *
 * @return {String} A valid cloudinary URL for the transformed image.
 */
export const generateUrl = (transformations = {}, cardBase = "vladde") => {
  let tfString = "";

  for (const type in transformations) {
    let tf = TransformationFactory.build(type, transformations[type]);
    console.log(tf.toString(), type);

    tfString += tf.toString();
  }

  return `${CLOUDINARY_BASE}${tfString}${CARD_BASE}${cardBase}`;
};
