import { Block } from "./Block.mjs";

export class Board {
  board;
  fallingBlock;
  currentRow;
  currentCol;
  coordinates;

  constructor(...args) {
    this.board = Array.from(Array(args[1] + 1), () => new Array(args[0])
        .fill(new Block(".")))
        .fill(new Array(args[0]).fill(new Block("#", true)), args[1]);
  }

  drop(block) {
    if (this.fallingBlock) throw "already falling";
    this.currentCol = Math.floor((this.board[0].length - 1) / 2);
    this.currentRow = 0;
    this.fallingBlock = block;
    this.coordinates = block.getCoordinates();
    this.draw();
  }

  tick() {
    this.validate();
    if (this.fallingBlock === null) return;
    this.undraw();
    this.currentRow++;
    this.draw();
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

  draw() {
    this.coordinates.forEach((r, ri) => r.forEach((c) => {
      const row = this.currentRow;
      const col = this.currentCol;
      const color = this.fallingBlock.getColor();
      this.board[row + ri][col + c] = new Block(color);
    }));
  }

  undraw() {
    this.coordinates.forEach((r, ri) => r.forEach((c) => {
      const row = this.currentRow;
      const col = this.currentCol;
      this.board[row + ri][col + c] = new Block(".");
    }));
  }

  validate() {
    if (this.isTaken()) {
      this.coordinates.forEach((r, ri) => r.forEach((c) => {
        const row = this.currentRow;
        const col = this.currentCol;
        this.board[row + ri][col + c].setTaken();
      }));
      this.fallingBlock = null;
    }
  }

  isTaken() {
    return this.coordinates.some((r, ri) => r.some((c) => {
      const row = this.currentRow + 1;
      const col = this.currentCol;
      return this.board[row + ri][col + c].isTaken();
    }));
  }

  toString() {
    return this.board
      .map((row) => row.map((col) => col.getColor())
      .join("")).slice(0,-1)
      .join("\n") + "\n";
  }
}
