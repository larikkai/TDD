import {RotatingShape} from "../src/RotatingShape.mjs";

export class Tetromino {

  static T_SHAPE = new Tetromino([
    ".T.\nTTT\n...",
    ".T.\n.TT\n.T.",
    "...\nTTT\n.T.",
    ".T.\nTT.\n.T.",], 0);

  static I_SHAPE = new Tetromino([
    ".....\n.....\nIIII.\n.....\n.....",
    "..I..\n..I..\n..I..\n..I..\n....."], 0);

  static O_SHAPE = new Tetromino([
    ".OO\n.OO\n..."], 0);

  #shape;
  #shapes;
  #rotation;

  constructor(...args) {
    this.#rotation = args[1];
    this.#shape = args[0][this.#rotation];
    this.#shapes = args[0];
  };

  toString() {
     return this.#shape.toString() + "\n";
  };

  rotateRight() {
    let nextRotation = this.#rotation + 1;
    if(nextRotation === this.#shapes.length) nextRotation = 0;
    return new Tetromino(this.#shapes, nextRotation);
  };

  rotateLeft() {
    let nextRotation = this.#rotation - 1;
    if(nextRotation < 0) nextRotation = this.#shapes.length - 1;
    return new Tetromino(this.#shapes, nextRotation);
  };
};
