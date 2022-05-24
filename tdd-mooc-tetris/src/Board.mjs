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
    this.updateFallingBlockPosition();
    this.draw();
    this.clean();
  }

  hasFalling() {
    if(this.fallingBlock) return true;
    return false;
  }

  draw() {
    for(let i = 0; i < this.fallingBlock[0].length; i++) {
      this.board[this.fallingBlock[0][i]] = this.fallingBlock[1];
    }
  }

  undraw() {
    for(let i = 0; i < this.fallingBlock[0].length; i++) {
      this.board[this.fallingBlock[0][i]] = ".";
    }
  }

  updateFallingBlockPosition() {
    for(let i = 0; i < this.fallingBlock[0].length; i++) {
      const newPosition = this.fallingBlock[0][i] + this.width;
      if(this.outOfBoard(newPosition)) {
        this.fallingBlock[2] = false;
        return;
      }
      this.fallingBlock[0][i] += this.width;
    }
  }

  outOfBoard(position) {
    if(position >= this.board.length) return true;
    return false;
  }

  clean() {
    if(!this.fallingBlock[2]) this.fallingBlock = null;
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
