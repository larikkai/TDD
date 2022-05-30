import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

  static T_SHAPE = new Tetromino(
    ".T.\nTTT\n...", 0, 4);

  static I_SHAPE = new Tetromino(
    ".....\n.....\nIIII.\n.....\n.....", 0, 2);

  static O_SHAPE = new Tetromino(
    ".OO\n.OO\n...", 0, 1);

  #rotations;
  #rotation;

  constructor(...args) {
    const [shape, rotation, rotations] = args
    this.#rotation = rotation;
    this.#rotations = this.getRotations(shape, rotations);
  };

  toString() {
    return this.#rotations[this.#rotation].toString();
  };

  rotateRight() {
    let nextRotation = this.#rotation + 1;
    if(nextRotation === this.#rotations.length) nextRotation = 0;
    return new Tetromino(null, nextRotation, this.#rotations);
  };

  rotateLeft() {
    let nextRotation = this.#rotation - 1;
    if(nextRotation < 0) nextRotation = this.#rotations.length - 1;
    return new Tetromino(null, nextRotation, this.#rotations);
  };

  getRotations(shape, rotations) {
    if(shape === null) return rotations;
    const newRotation = new RotatingShape(shape);
    return [
      newRotation,
      newRotation.rotateRight(),
      newRotation.rotateRight().rotateRight(),
      newRotation.rotateRight().rotateRight().rotateRight()
      ].slice(0, rotations);
  };
};
