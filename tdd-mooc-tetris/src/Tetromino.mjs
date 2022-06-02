import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = new Tetromino([
    "....\nTTT.\n.T..\n....",
    ".T..\nTT..\n.T..\n....",
    "....\n.T..\nTTT.\n....",
    ".T..\n.TT.\n.T..\n...."], 0, "T");

  static I_SHAPE = new Tetromino([
    "....\nIIII\n....\n....",
    "..I.\n..I.\n..I.\n..I."], 0, "I");

  static O_SHAPE = new Tetromino([
    "....\n.OO.\n.OO.\n...."], 0, "O");

  #rotations;
  #rotation;
  #color;

  constructor(...args) {
    [this.#rotations, this.#rotation, this.#color] = args;
  }

  toString() {
    return this.#rotations[this.#rotation].toString() + "\n";
  }

  rotateRight() {
    const [next, max] = [this.#rotation + 1, this.#rotations.length];
    const nextRotation = next === max ? 0 : next;
    return new Tetromino(this.#rotations, nextRotation, this.#color);
  }

  rotateLeft() {
    const [next, max] = [this.#rotation - 1, this.#rotations.length - 1];
    const nextRotation = next < 0 ? max : next;
    return new Tetromino(this.#rotations, nextRotation, this.#color);
  }

  getColor() {
    return this.#color;
  }

  getCoordinates() {
    return this.#rotations[this.#rotation]
      .toString()
      .split("\n")
      .map((s) => s.split(""))
      .map((row, r) =>
        row
          .map((column, c) => {
            if (column !== ".") return c - 1;
            return;
          })
          .filter((column) => column !== undefined)
      );
     // .filter((arr) => arr.length !== 0);
  }
}
