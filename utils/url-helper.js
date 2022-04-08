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

import { TransformationFactory } from "../src/transformation-factory";

export const generateUrl = (transformations = {}) => {
  const tf = TransformationFactory.createTransformation("NAME", "owo");

  console.log(tf);
  return tf.toString();
};
