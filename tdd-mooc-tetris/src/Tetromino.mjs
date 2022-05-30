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
    const [next, max] = [this.#rotation + 1, this.#rotations.length];
    const nextRotation = next === max ? 0 : next;
    return new Tetromino(null, nextRotation, this.#rotations);
  };

  rotateLeft() {
    const [next, max] = [this.#rotation - 1, this.#rotations.length - 1];
    const nextRotation = next < 0 ? max : next;
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
