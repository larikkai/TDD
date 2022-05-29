import {RotatingShape} from "../src/RotatingShape.mjs";

export class Tetromino {

  static T_SHAPE = {
    toString: function() {
      return [
      [".", "T", "."],
      ["T", "T", "T"],
      [".", ".", "."]
      ].map(row => row.join("")).join("\n") + "\n";
    },
    rotateRight: function() {
      return new RotatingShape(this.toString()).rotateRight();
    },
    rotateLeft: function() {
      return new RotatingShape(this.toString()).rotateLeft();
    }
  };

  static I_SHAPE = new Tetromino([
    ".....\n.....\nIIII.\n.....\n.....",
    "..I..\n..I..\n..I..\n..I..\n....."], 0);

  #shape;
  #shapes;
  rotation;

  constructor(...args) {
    this.rotation = args[1];
    this.#shape = args[0][this.rotation];
    this.#shapes = args[0];
  }

  toString() {
     return this.#shape.toString() + "\n";
  }

  rotateRight() {
    let nextRotation = this.rotation + 1;
    if(nextRotation === this.#shapes.length) nextRotation = 0;
    return new Tetromino(this.#shapes, nextRotation);
  }

  rotateLeft() {
    let nextRotation = this.rotation - 1;
    if(nextRotation < 0) nextRotation = this.#shapes.length - 1;
    return new Tetromino(this.#shapes, nextRotation);
  }
};
