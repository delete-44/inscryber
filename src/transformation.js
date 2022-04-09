export class Transformation {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }

  /**
   * Generates a string to inject to the cloudinary URL
   *
   * @return {String} Generated transformation for this object. Specifics determined by subclasses
   */
  toString() {
    throw new Error("To be overwritten in subclass");
  }
}
