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
    this.validate(1, 0);
    if (!this.fallingBlock) return;
    this.execute(new Block("."), "draw");
    this.currentRow++;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

  move(row, col) {
    this.validate(row, col);
    if (!this.fallingBlock) return;
    this.execute(new Block("."), "draw");
    this.currentRow += row;
    this.currentCol += col;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  rotate(option) {
    if (!this.fallingBlock) return;
    if (option === "left") this.rotateLeft();
    if (option === "right") this.rotateRight();
  }

  rotateLeft() {
    const newBlock = this.fallingBlock.rotateLeft();
    const newCoordinates = newBlock.getCoordinates();
    const row = this.currentRow;
    const col = this.currentCol;
    this.execute(new Block("."), "draw");
    if(this.valid(newCoordinates, row, col)) {
      this.fallingBlock = newBlock;
      this.coordinates = newCoordinates; 
    }
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  rotateRight() {
    const newBlock = this.fallingBlock.rotateRight();
    const newCoordinates = newBlock.getCoordinates();
    const row = this.currentRow;
    const col = this.currentCol;
    this.execute(new Block("."), "draw");
    if(this.valid(newCoordinates, row, col)) {
      this.fallingBlock = newBlock;
      this.coordinates = newCoordinates; 
    }
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
    console.log(this.toString());
  }

  valid(coordinates, r, c) {
    return !coordinates.some((value) => {
      const row = r + Math.floor(value / 4);
      const col = c + (value % 4);
      return this.board[row][col].isTaken();
    });
  }

  execute(block, option) {
    this.coordinates.forEach((value) => {
      const row = this.currentRow + Math.floor(value / 4);
      const col = this.currentCol + (value % 4);
      if (option === "draw") this.board[row][col] = block;
      if (option === "setTaken") this.board[row][col].setTaken();
    });
  }

  validate(row, col) {
    if (this.isTaken(null, col)) return (this.currentCol += -col);
    if (this.isTaken(row, null)) {
      this.execute(null, "setTaken");
      this.fallingBlock = null;
    }
  }

  isTaken(ro, co) {
    return this.coordinates.some((value) => {
      const row = this.currentRow + Math.floor(value / 4) + ro ?? 0;
      const col = this.currentCol + (value % 4) + co ?? 0;
      return this.board[row][col].isTaken();
    });
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
