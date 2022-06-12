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

function move(board, n, r, c) {
  for (let i = 0; i < n; i++) {
    board.move(r, c);
  }
}

function fill(board, r, s, e) {
  for (let i = s; i <= e; i++) {
    board.setRowColTaken(r, i);
  }
}

describe("Full lines clear", () => {
  let board;
  beforeEach(() => {
    board = new Board(6, 4, new State());
    fill(board, 3, 0, 1);
    fill(board, 3, 3, 5);
  });

  it("Lines clear dont clear when block falling", () => {
    board.drop(Tetromino.T_SHAPE);
    tick(board, 2);
    expect(board.toString()).to.equalShape(
      `......
       ......
       .TTT..
       XXTXXX`
    );
    expect(board.hasFalling(), "Player can rotate falling block").to.be.true;
  });

  it("One line clear - bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    tick(board, 3);
    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       .TTT..`
    );
    expect(board.hasFalling(), "Cannot rotate if no falling tetromino").to.be
      .false;
  });

  it("One line clear - top", () => {
    fill(board, 2, 0, 0);
    fill(board, 2, 5, 5);
    board.drop(Tetromino.I_SHAPE);
    tick(board, 3);
    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       XX.XXX`
    );
    expect(board.hasFalling(), "Cannot rotate if no falling tetromino").to.be
      .false;
  });

  it("Two line clear - bottom", () => {
    fill(board, 2, 0, 0);
    fill(board, 2, 4, 5);
    board.drop(Tetromino.T_SHAPE);
    tick(board, 3);
    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......`
    );
    expect(board.hasFalling(), "Cannot rotate if no falling tetromino").to.be
      .false;
  });

  it("Three line clear - bottom", () => {
    board.drop(Tetromino.L_SHAPE);
    tick(board, 1);
    board.rotate("right");
    fill(board, 2, 0, 1);
    fill(board, 2, 3, 5);
    fill(board, 1, 0, 0);
    fill(board, 1, 3, 5);
    fill(board, 0, 0, 0);
    fill(board, 0, 4, 5);
    tick(board, 2);
    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       X...XX`
    );
    expect(board.hasFalling(), "Cannot rotate if no falling tetromino").to.be
      .false;
  });

  it("Four line clear - bottom", () => {
    board.drop(Tetromino.I_SHAPE);
    move(board, 1, 0, -1);
    tick(board, 1);
    board.rotate("right");
    fill(board, 2, 0, 1);
    fill(board, 2, 3, 5);
    fill(board, 1, 0, 1);
    fill(board, 1, 3, 5);
    fill(board, 0, 0, 1);
    fill(board, 0, 3, 5);
    tick(board, 3);
    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......`
    );
    expect(board.hasFalling(), "Cannot rotate if no falling tetromino").to.be
      .false;
  });
});
