export class Transformation {
  constructor(value) {
    this.value = value;
  }

  toString() {
    throw new Error("To be overwritten in subclass");
  }
}
