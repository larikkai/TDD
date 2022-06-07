import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function tick(board, n) {
  for(let i = 0; i < n; i++) {
    board.tick();
  }
}

function rotate(board, n, direction) {
  for(let i = 0; i < n; i++) {
    board.rotate(direction);
  }
}

function move(board, n, r, c) {
  for(let i = 0; i < n; i++) {
    board.move(r,c);
  }
}

describe("Wall kick t_shape tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
    tick(board, 4);
  });

  it("Falling tetromino can be wall kicked on left", () => {
    board.rotate("left");
    move(board, 5, 0, -1);
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .T........
       TTT.......`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Falling tetromino can be wall kicked on right", () => {
    board.rotate("right");
    move(board, 5, 0, 1);
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ........T.
       .......TTT`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });
});
