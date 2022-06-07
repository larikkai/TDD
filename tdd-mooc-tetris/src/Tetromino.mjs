import { Board } from "./Board.mjs";
import { Shapes } from "./Shapes.mjs";

export class Tetromino {
  static I_SHAPE = new Tetromino(Shapes.I_SHAPE);
  static T_SHAPE = new Tetromino(Shapes.T_SHAPE);
  static O_SHAPE = new Tetromino(Shapes.O_SHAPE);
  static L_SHAPE = new Tetromino(Shapes.L_SHAPE);
  static J_SHAPE = new Tetromino(Shapes.J_SHAPE);
  static S_SHAPE = new Tetromino(Shapes.S_SHAPE);
  static Z_SHAPE = new Tetromino(Shapes.Z_SHAPE);

  #rotations;
  #rotation;
  #color;

  constructor(args) {
    [this.#rotations, this.#rotation, this.#color] = args;
  }

  toString() {
    const board = new Board(4, 4);
    board.drop(this, 0);
    return board.toString();
  }

  rotateRight() {
    const [next, max] = [this.#rotation + 1, this.#rotations.length];
    const nextRotation = next === max ? 0 : next;
    return new Tetromino([this.#rotations, nextRotation, this.#color]);
  }

  rotateLeft() {
    const [next, max] = [this.#rotation - 1, this.#rotations.length - 1];
    const nextRotation = next < 0 ? max : next;
    return new Tetromino([this.#rotations, nextRotation, this.#color]);
  }

  getColor() {
    return this.#color;
  }

  getCoordinates() {
    return this.#rotations[this.#rotation];
  }
}
