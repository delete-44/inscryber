export class Transformation {
  constructor(value, type) {
    this.value = value;
    this.type = type;
  }

  toString() {
    throw new Error("To be overwritten in subclass");
  }
}
