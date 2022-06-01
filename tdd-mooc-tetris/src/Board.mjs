import { Block } from "./Block.mjs";

export class Board {
  width;
  height;
  board;
  fallingBlock;
  currentPosition;
  coordinates;

  constructor(...args) {
    [this.width, this.height] = args;
    this.board = new Array((this.width + 1) * this.height)
      .fill(new Block("."))
      .fill(new Block("#", true), this.width * this.height);
  }

  drop(block) {
    if (this.fallingBlock) throw "already falling";
    this.currentPosition = Math.floor((this.width - 1) / 2);
    this.fallingBlock = block;
    this.updateCoordinates();
    this.draw();
  }

  tick() {
    this.validate();
    if (this.fallingBlock === null) return;
    this.undraw();
    this.currentPosition += this.width;
    this.draw();
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

  draw() {
    this.coordinates.forEach((value) => {
      this.board[this.currentPosition + value] = new Block(
        this.fallingBlock.getColor()
      );
    });
  }

  undraw() {
    this.coordinates.forEach((value) => {
      this.board[this.currentPosition + value] = new Block(".");
    });
  }

  validate() {
    const newPos = this.currentPosition + this.width;
    if (
      this.coordinates.some((value) => this.board[newPos + value].isTaken())
    ) {
      this.coordinates.forEach((value) =>
        this.board[this.currentPosition + value].setTaken()
      );
      this.fallingBlock = null;
    }
  }

  updateCoordinates() {
    this.coordinates = this.fallingBlock
      .getCoordinates()
      .map((row, r) => row.map((column, c) => r * this.width + column))
      .flat();
  }

  toString() {
    let print = "";
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        print += this.board[i * this.width + j].getColor();
      }
      print += "\n";
    }
    return print;
  }
}
