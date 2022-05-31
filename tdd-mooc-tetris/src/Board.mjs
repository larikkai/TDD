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
    this.board = new Array(this.width*this.height).fill(false);
  }
	
  drop(block) {
    if(this.fallingBlock) throw "already falling";
    this.currentPosition = Math.floor((this.width - 1)/2);
    this.fallingBlock = block;
    this.draw();
  }

  tick() {
    this.updateFallingBlockPosition();
    if(!this.fallingBlock) return;
    this.undraw();
    this.draw();
  }

  hasFalling() {
    return this.fallingBlock ? true : false;
  }

  draw() {
    this.updateCoordinates();
    this.coordinates.forEach(value => {
      this.board[value] = this.fallingBlock.getColor();
    });
  };

  undraw() {
    this.coordinates.forEach(value => { 
      this.board[value] = false;
    });
  };

  updateCoordinates() {
    this.coordinates = this.fallingBlock.getCoordinates()
      .map((row, r) => row
      .map((column, c) => r*this.width+this.currentPosition+column))
      .flat();
  };

  updateFallingBlockPosition() {
    const newPosition = this.currentPosition + this.width;
    if(this.notValidPosition(newPosition)) {
      this.fallingBlock = null;
      return;
    }
    this.currentPosition += this.width;
  }

  notValidPosition(position) {
    if(this.outOfBoard(position)) return true;
    if(this.taken(position)) return true;
    return false;
  }

  outOfBoard(position) {
    if(position >= this.board.length) return true;
    return false;
  }

  taken(position) {
    return this.board[position];
  };

  toString() {
    let print = "";
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        const taken = this.board[i*this.width+j];
        if(!taken) print += ".";
        else print += taken;
      }
      print += "\n";
    }
    return print;
  }
}
