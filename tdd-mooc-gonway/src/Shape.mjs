export class Shape {
  #shape;

  constructor(string) {
    this.#shape = string ?? "";
  }

  toString() {
    return this.#shape;
  }
}
