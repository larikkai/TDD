import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {

  static T_SHAPE = new Tetromino(
    ".T.\nTTT\n...", 0, 4);

  static I_SHAPE = new Tetromino(
    ".....\n.....\nIIII.\n.....\n.....", 0, 2);

  static O_SHAPE = new Tetromino(
    ".OO\n.OO\n...", 0, 1);

  #shapes;
  #rotation;

  constructor(...args) {
    const [shape, rotation, shapes] = args
    this.#rotation = rotation;
    this.#shapes = this.getRotations(shape, shapes);
  };

  toString() {
    return this.#shapes[this.#rotation].toString();
  };

  rotateRight() {
    let nextRotation = this.#rotation + 1;
    if(nextRotation === this.#shapes.length) nextRotation = 0;
    return new Tetromino(null, nextRotation, this.#shapes);
  };

  rotateLeft() {
    let nextRotation = this.#rotation - 1;
    if(nextRotation < 0) nextRotation = this.#shapes.length - 1;
    return new Tetromino(null, nextRotation, this.#shapes);
  };

  getRotations(shape, shapes) {
    if(shape) {
      const newShape = new RotatingShape(shape);
      return [
        newShape,
        newShape.rotateRight(),
        newShape.rotateRight().rotateRight(),
        newShape.rotateRight().rotateRight().rotateRight()
        ].slice(0, shapes);
    } else {
      return shapes;
    };
  };
};
