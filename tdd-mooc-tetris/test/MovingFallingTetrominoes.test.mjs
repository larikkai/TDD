import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function move(...args) {
  for (let i = 0; i < args[1]; i++) {
    args[0].move(args[2], args[3]);
  }
}

describe("Move falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("Can move left one block", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 1, 0, -1);

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("Can move right one block", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 1, 0, 1);

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("Can move down one block", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 1, 1, 0);

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  it("Still able to move the block - left", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 3, 0, -1);

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
    expect(board.hasFalling(), "The player should be able to move the block").to
      .be.true;
  });

  it("Cannot move beyond the board - left", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 4, 0, -1);

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("Still able to move the block - rigth", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 4, 0, 1);

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
    expect(board.hasFalling(), "The player should be able to move the block").to
      .be.true;
  });

  it("Cannot move beyond the board - rigth", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 5, 0, 1);

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("Still able to move the block - bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 4, 1, 0);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
    expect(board.hasFalling(), "The player should be able to move the block").to
      .be.true;
  });

  it("Cannot move beyond the board - bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 5, 1, 0);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
    expect(board.hasFalling(), "The block should stop moving").to.be.false;
  });

  it("Cannot move through other blocks - right", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 5, 0, 1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 5, 0, 1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 3, 1, 0);
    move(board, 2, 0, 1);
    move(board, 1, 1, 0);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ........T.
       ......TTTT
       .....TTTT.
       .......TTT`
    );
    expect(board.hasFalling(), "The block should stop moving").to.be.false;
  });

  it("Still able to move the block - right", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 5, 0, 1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 5, 0, 1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 2, 1, 0);
    move(board, 2, 0, 1);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T..T.
       ....TTTTTT
       ........T.
       .......TTT`
    );
    expect(board.hasFalling(), "The player should be able to move the block").to
      .be.true;
  });

  it("Still able to move the block - left", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 4, 0, -1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 4, 0, -1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 3, 1, 0);
    move(board, 1, 0, -1);
    move(board, 1, 1, 0);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T........
       TTTT......
       .TTTT.....
       TTT.......`
    );
    expect(board.hasFalling(), "The block should stop moving").to.be.false;
  });

  it("Cannot move through other blocks - left", () => {
    board.drop(Tetromino.T_SHAPE);
    move(board, 4, 0, -1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 4, 0, -1);
    move(board, 5, 1, 0);
    board.drop(Tetromino.T_SHAPE);
    move(board, 2, 1, 0);
    move(board, 2, 0, -1);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .T..T.....
       TTTTTT....
       .T........
       TTT.......`
    );
    expect(board.hasFalling(), "The block should not stop moving").to.be.true;
  });
});
