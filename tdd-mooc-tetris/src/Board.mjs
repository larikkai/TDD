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

  drop(block, row) {
    if (this.fallingBlock) throw "already falling";
    this.initFallingBlock(block);
    this.initRowCol(row);
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  tick() {
    if (!this.validate(1, 0)) return;
    this.execute(new Block("."), "undraw");
    this.currentRow++;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

  move(r, c) {
    if (!this.validate(r, c)) return;
    this.execute(new Block("."), "undraw");
    this.currentRow += r;
    this.currentCol += c;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  rotate(opt) {
    if (!this.fallingBlock) return;
    const newBlock = this.getRotatedBlock(opt);
    const newCoord = newBlock.getCoordinates();
    const row = this.currentRow;
    const col = this.currentCol;
    this.execute(new Block("."), "undraw");
    if (this.valid(newCoord, row, col) || this.kick(newCoord, row, col)) {
      this.fallingBlock = newBlock;
      this.coordinates = newCoord;
    }
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  getRotatedBlock(opt) {
    if (opt === "left") return this.fallingBlock.rotateLeft();
    if (opt === "right") return this.fallingBlock.rotateRight();
    return this.fallingBlock;
  }

  kick(coordinates, r, c) {
    if (this.cannotKick(coordinates, r, c)) return false;
    if (this.valid(coordinates, r, c + 1)) this.currentCol++;
    if (this.valid(coordinates, r, c - 1)) this.currentCol--;
    return true;
  }

  cannotKick(coordinates, r, c) {
    const color = this.fallingBlock.getColor();
    if (color === "I") return true;
    if (color === "L" || color === "J" || color === "T")
      return this.centerColumnRule(coordinates, r, c);
    return false;
  }

  centerColumnRule(coordinates, r, c) {
    let first = 0;
    return coordinates.some((value) => {
      const row = r + Math.floor(value / 4);
      const col = c + (value % 4);
      if (col < 0) return false;
      const taken = this.board[row][col].isTaken();
      if (taken) first++;
      return this.firstTakenMidColumn(row, col, first, value, taken);
    });
  }

  firstTakenMidColumn(row, col, first, value, taken) {
    const center = value === 1 || value === 5 || value === 9;
    if (first === 1 && center && taken) return true;
    return false;
  }

  valid(coordinates, r, c) {
    return !coordinates.some((value) => {
      const row = r + Math.floor(value / 4);
      const col = c + (value % 4);
      if (col < 0 || col >= this.board[row].length) return true;
      return this.board[row][col].isTaken();
    });
  }

  execute(block, opt) {
    this.coordinates.forEach((value) => {
      const row = this.currentRow + Math.floor(value / 4);
      const col = this.currentCol + (value % 4);
      if (opt === "draw" || opt === "undraw") this.board[row][col] = block;
      if (opt === "setTaken") this.board[row][col].setTaken();
    });
  }

  validate(r, c) {
    if (!this.fallingBlock) return false;
    const coordinates = this.coordinates;
    const row = this.currentRow;
    const col = this.currentCol;
    const bottom = !this.valid(coordinates, row + r, col);
    const valid = this.valid(coordinates, row, col + c);
    if (valid && !bottom) return true;
    if (bottom) this.freeze();
    return false;
  }

  freeze() {
    this.execute(null, "setTaken");
    this.fallingBlock = null;
  }

  setRowColTaken(row, col) {
    this.board[row][col + 1] = new Block("X", true);
  }

  createBoard(w, h) {
    return [...Array(h + 1)]
      .map((x) =>
        Array(w + 2)
          .fill(new Block("#", true), 0, 1)
          .fill(new Block("."), 1, w + 1)
          .fill(new Block("#", true), w + 1)
      )
      .fill(new Array(w + 2).fill(new Block("#", true)), h);
  }

  initFallingBlock(block) {
    [this.fallingBlock, this.coordinates] = [block, block.getCoordinates()];
  }

  initRowCol(r) {
    const row = r ?? -1;
    const col = (this.board[0].length - this.coordinates.length) / 2;
    [this.currentRow, this.currentCol] = [row, Math.floor(col)];
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
