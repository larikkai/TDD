export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = new Array(width*height).fill(".");
  }

  toString() {
    let print = "";
    for(let i = 0; i < this.height; i++) {
      for(let j = 0; j < this.width; j++) {
	print += this.board[i+j];
      }
      print += "\n";
    }
    return print;
  }
}
