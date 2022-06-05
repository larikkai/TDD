import { expect } from "chai";
import { B } from "../src/Board2.mjs";
import { Tet } from "../src/Tetromino2.mjs";

describe("Move falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new B(10, 6);
    board.drop(Tet.T_SHAPE);
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

  it("Falling block can be rotated", () => {
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

  it("Only falling block will rotate", () => {
    board.tick();
    board.tick();
    board.tick();
    board.drop(Tet.T_SHAPE);
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
