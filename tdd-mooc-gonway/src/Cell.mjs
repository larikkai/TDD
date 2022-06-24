export class Cell {
  #alive;

  constructor(alive) {
    this.#alive = alive;
  }

  setAlive(state) {
    this.#alive = state;
  }

  getColor() {
    return this.#alive ? "o" : "b";
  }
}
