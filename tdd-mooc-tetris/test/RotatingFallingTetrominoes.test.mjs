import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { State } from "../src/State.mjs";
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
    board = new Board(10, 6, new State());
    board.drop(Tetromino.T_SHAPE);
  });

  it("Cannot rotate if no falling tetromino", () => {
    tick(board, 5);
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

  it("Dropped tetromino can be rotated at start if room", () => {
    tick(board, 5);
    board.rotate("left");
    board.drop(Tetromino.I_SHAPE);
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ...TTT....
       ....T.....`
    );
    expect(board.hasFalling(), "No tetromino to rotate").to.be.true;
  });

  it("Falling tetromino can be rotated left at start", () => {
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Falling tetromino can be rotated left", () => {
    tick(board, 4);
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
    tick(board, 4);
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
    tick(board, 5);
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
    tick(board, 4);
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
    tick(board, 4);
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
