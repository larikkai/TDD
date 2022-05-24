export class Board {
  width;
  height;
  board;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(width*height).fill(".");
  }
	
  drop(block) {
    if(this.fallingBlock) throw "already falling";
    this.fallingBlock = [[1], block.color, true];
    this.draw();
  }

  tick() {
    this.undraw();
    this.updateBlockPosition();
    this.draw();
  }

  hasFalling() {
    if(this.fallingBlock[2]) return true;
    return false;
  }

  draw() {
    for(let i = 0; i < this.fallingBlock.length; i++) {
      this.board[this.fallingBlock[0][i]] = this.fallingBlock[1];
    }
  }

  undraw() {
    for(let i = 0; i < this.fallingBlock.length; i++) {
      this.board[this.fallingBlock[0][i]] = ".";
    }
  }

  updateBlockPosition() {
    for(let i = 0; i < this.fallingBlock.length; i++) {
      const updatedPosition = this.fallingBlock[0][i] + this.width;
      if(updatedPosition >= this.board.length) {
        this.fallingBlock[2] = false;
        return;
      }
      this.fallingBlock[0][i] += this.width;
    }
  }

  toString() {
    let print = "";
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
        print += this.board[i*this.height+j];
      }
      print += "\n";
    }
    return print;
  }
}
