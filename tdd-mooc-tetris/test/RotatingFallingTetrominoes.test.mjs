import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("Rotate falling t_shape tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
  });

  it("Cannot rotate if no falling tetromino", () => {
    board.tick();
    board.tick();
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
       ....T.....
       ....TT....
       ....T.....
       ..........
       ..........`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Falling tetromino can be rotated right", () => {
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Only falling block will rotate", () => {
    board.tick();
    board.tick();
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
});
