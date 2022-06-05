export class Block {
  #color;
  #taken;

  constructor(...args) {
    this.#color = args[0];
    this.#taken = args[1] ?? false;
  }

  getColor() {
    return this.#color;
  }

  isTaken() {
    return this.#taken;
  }

  setTaken() {
    this.#taken = true;
  }

  getCoordinates() {
    return [0];
  }
}
