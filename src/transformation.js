export class Transformation {
  constructor(value, type, config = {}) {
    this.value = value;
    this.type = type;
    this.isActThree = config.isActThree || false;
  }

  /**
   * Generates a string to inject to the cloudinary URL.
   * By default, will use the act 1 or act 3 helper methods as required
   * by config. Override this function instead if no change to the styles
   * is required.
   *
   * @return {String} Generated transformation for this object. Specifics determined by subclasses.
   */
  toString() {
    return this.isActThree ? this.actThreeString() : this.actOneString();
  }

  /**
   * Generates a cloudinary transformation segment in the theme of act 1 cards.
   *
   * @return {String} Generated transformation for act 1 cards.
   */
  actOneString() {
    throw new Error("[Act 1] To be overwritten in subclass");
  }

  /**
   * Generates a cloudinary transformation segment in the theme of act 3 cards.
   *
   * @return {String} Generated transformation for act 3 cards.
   */
  actThreeString() {
    throw new Error("[Act 3] To be overwritten in subclass");
  }
}
