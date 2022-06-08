import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function tick(board, n) {
  for (let i = 0; i < n; i++) {
    board.tick();
  }
}

function rotate(board, n, direction) {
  for (let i = 0; i < n; i++) {
    board.rotate(direction);
  }
}

describe("Rotate falling t_shape tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
    tick(board, 4);
  });

  it("Cannot rotate if no falling tetromino", () => {
    board.tick();
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
    expect(board.hasFalling(), "No tetromino to rotate").to.be.false;
  });

  it("Falling tetromino can be rotated left", () => {
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ....TT....
       ....T.....`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Falling tetromino can be rotated right", () => {
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ...TT.....
       ....T.....`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Only falling block will rotate", () => {
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ...TTT....
       ....T.....`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Can rotate left if no room and kick possible", () => {
    board.rotate("left");
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.move(0, 1);
    tick(board, 2);
    rotate(board, 2, "left");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......T...
       ....TTTT..
       ....TT....
       ....T.....`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Can rotate right if no room and kick possible", () => {
    board.rotate("right");
    board.tick();
    board.drop(Tetromino.T_SHAPE);
    board.move(0, -1);
    tick(board, 2);
    rotate(board, 2, "right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..T.......
       .TTTT.....
       ...TT.....
       ....T.....`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });
});
