import { TransformationFactory } from "../transformation-factory";
import { CARD_BASE, CLOUDINARY_BASE } from "components/constants";

/*
 * Accepts an object of changes in the format
 * {
 *   name: "delete",
 *   cost: {
 *     value: "5",
 *     type: "energy"
 *   }
 * }
 */

export const generateUrl = (transformations = {}, cardBase = "vladde") => {
  let tfString = "";

  for (const type in transformations) {
    let tf = TransformationFactory.build(type, transformations[type]);
    console.log(tf.toString(), type)

    tfString += tf.toString();
  }

  return `${CLOUDINARY_BASE}${tfString}${CARD_BASE}${cardBase}`;
};
