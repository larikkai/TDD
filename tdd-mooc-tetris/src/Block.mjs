export class Block {
  #color;

  constructor(...args) {
    [this.#color] = args;
  };

  getColor() {
    return this.#color;
  };

  getCoordinates() {
    return [[0]];
  };
};
