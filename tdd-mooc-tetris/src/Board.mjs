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
    if (!this.validate(1,0)) return;
    this.execute(new Block("."), "undraw");
    this.currentRow++;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

  move(r, c) {
    if(!this.validate(r,c)) return;
    this.execute(new Block("."), "undraw");
    this.currentRow += r;
    this.currentCol += c;
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
  }

  rotate(opt) {
    if (!this.fallingBlock) return;
    let newBlock;
    if (opt === "left") newBlock = this.fallingBlock.rotateLeft();
    if (opt === "right") newBlock = this.fallingBlock.rotateRight();
    const newCoordinates = newBlock.getCoordinates();
    const row = this.currentRow;
    const col = this.currentCol;
    this.execute(new Block("."), "undraw");
    if(this.valid(newCoordinates, row, col)) {
      this.fallingBlock = newBlock;
      this.coordinates = newCoordinates; 
    } else if (this.kick(newCoordinates, row, col)) {
      this.fallingBlock = newBlock;
      this.coordinates = newCoordinates; 
    }
    this.execute(new Block(this.fallingBlock.getColor()), "draw");
    console.log(this.toString());
  }
  
  kick(coordinates, r, c) {
    const width = this.board[0].length - 1;
    const atWall = this.atWall(coordinates, r, c);
    if(atWall && this.valid(coordinates, r, c + 1)) {
      this.currentCol++;
      return true;
    }
    if(atWall && this.valid(coordinates, r, c - 1)) {
       this.currentCol--;
       return true;
    }
    return false;
  }

  atWall(coordinates, r, c) {
    return coordinates.some((value) => {
      const row = r + Math.floor(value / 4);
      const col = c + (value % 4);
      const taken = this.board[row][col].isTaken();
      const atWall = this.board[row][col].getColor() === "#";
      if(atWall && taken) return true;
      return false;
    });
  }

  valid(coordinates, r, c) {
    return !coordinates.some((value) => {
      const row = r + Math.floor(value / 4);
      const col = c + (value % 4);
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
    if(!this.fallingBlock) return false;
    const coordinates = this.coordinates;
    const row = this.currentRow;
    const col = this.currentCol;
    const freeze = !this.valid(coordinates, row + r, col);
    const notValid = !this.valid(coordinates, row, col + c);
    if(notValid) return;
    if(freeze) {
      this.execute(null, "setTaken");
      this.fallingBlock = null;
      return false;
    }
    return true;
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
