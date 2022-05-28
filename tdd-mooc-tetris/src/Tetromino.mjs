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

  static I_SHAPE = {
    toString: function() {
      return [
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      ["I", "I", "I", "I", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      ].map(row => row.join("")).join("\n") + "\n";
    },
    rotateRight: function() {
      return new RotatingShape(this.toString()).rotateRight();
    },
    rotateLeft: function() {
      return new RotatingShape(this.toString()).rotateRight();
    }
  };
};
