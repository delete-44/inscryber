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

import { TransformationFactory } from "../transformation-factory";

export const generateUrl = (transformations = {}) => {
  let tfString = "";

  for (const type in transformations) {
    let tf = TransformationFactory.build(type, transformations[type]);

    tfString += tf.toString();
  }

  return tfString;
};
