import { B } from "./Board2.mjs";
import { Shapes } from "./Shapes.mjs";

export class Tet {

  static I_SHAPE = new Tet(Shapes.I_SHAPE);
  static T_SHAPE = new Tet(Shapes.T_SHAPE);
  static O_SHAPE = new Tet(Shapes.O_SHAPE);

  #rotations;
  #rotation;
  #color;

  constructor(args) {
    [this.#rotations, this.#rotation, this.#color] = args;
  }

  toString() {
    const board = new B(4,3);
    board.drop(this);
    return board.toString();
  }

  rotateRight() {
    const [next, max] = [this.#rotation + 1, this.#rotations.length];
    const nextRotation = next === max ? 0 : next;
    return new Tet([this.#rotations, nextRotation, this.#color]);
  }

  rotateLeft() {
    const [next, max] = [this.#rotation - 1, this.#rotations.length - 1];
    const nextRotation = next < 0 ? max : next;
    return new Tet([this.#rotations, nextRotation, this.#color]);
  }

  getColor() {
    return this.#color;
  }

  getCoordinates() {
    return this.#rotations[this.#rotation];
  }
}
