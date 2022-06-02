import { Block } from "./Block.mjs";

export class Board {
  board;
  currentRow;
  currentCol;
  fallingBlock;
  coordinates;

  constructor(width, height) {
    this.board = this.createBoard(width, height);
  }

  drop(block) {
    if (this.fallingBlock) throw "already falling";
    this.currentCol = Math.floor((this.board[0].length - 1) / 2);
    this.currentRow = 0;
    this.fallingBlock = block;
    this.coordinates = block.getCoordinates();
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  tick() {
    this.validate(1, 0);
    if (this.fallingBlock === null) return;
    this.execute(new Block("."), "draw");
    this.currentRow++;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

  move(row, col) {
    this.validate(row, col);
    if (this.fallingBlock === null) return;
    this.execute(new Block("."), "draw");
    this.currentRow += row;
    this.currentCol += col;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  execute(block, option) {
    this.coordinates.forEach((r, ri) =>
      r.forEach((c) => {
        const row = this.currentRow + ri;
        const col = this.currentCol + c;
        if (option === "draw") this.board[row][col] = block;
        if (option === "setTaken") this.board[row][col].setTaken();
      })
    );
  }

  validate(row, col) {
    if (this.isTaken(null, col)) {
      this.currentCol += -col;
      return;
    }
    if (this.isTaken(row, null)) {
      this.execute(null, "setTaken");
      this.fallingBlock = null;
    }
  }

  isTaken(ro, co) {
    return this.coordinates.some((r, ri) =>
      r.some((c) => {
        const row = this.currentRow + ro ?? 0;
        const col = this.currentCol + co ?? 0;
        return this.board[row + ri][col + c].isTaken();
      })
    );
  }

  createBoard(w, h) {
    return Array.from(
      Array(h + 1),
      () =>
        new Array(w + 2)
          .fill(new Block("#", true), 0, 1)
          .fill(new Block("."), 1, w + 1)
          .fill(new Block("#", true), w + 1),
      w + 2
    ).fill(new Array(w + 2).fill(new Block("#", true)), h);
  }

  toString() {
    return (
      this.board
        .map((row) =>
          row
            .map((col) => col.getColor())
            .slice(1, -1)
            .join("")
        )
        .slice(0, -1)
        .join("\n") + "\n"
    );
  }
}
