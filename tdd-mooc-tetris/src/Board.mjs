import { Block } from "./Block.mjs";

export class Board {
  board;
  currentRow;
  currentCol;
  fallingBlock;
  coordinates;

  constructor(...args) {
    this.board = Array.from(Array(args[1] + 1), () =>
      new Array(args[0] + 2).fill(new Block("."))
    )
      .fill(new Array(args[0] + 2).fill(new Block("#", true)), args[1])
      .map((row, ri) =>
        row.map((col, ci) => {
          if (ci === 0 || ci === args[0] + 1) return new Block("#", true);
          return col;
        })
      );
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

  execute(...args) {
    this.coordinates.forEach((r, ri) =>
      r.forEach((c) => {
        const row = this.currentRow + ri;
        const col = this.currentCol + c;
        if (args[1] === "draw") this.board[row][col] = args[0];
        if (args[1] === "setTaken") this.board[row][col].setTaken();
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
