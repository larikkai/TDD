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

describe("Kick L shape tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6, new State());
    board.drop(Tetromino.L_SHAPE);
    tick(board, 4);
  });

  it("Falling tetromino can be kicked on left", () => {
    board.rotate("left");
    move(board, 5, 0, -1);
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..L.......
       LLL.......`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("Falling tetromino can be kicked on right", () => {
    board.rotate("right");
    move(board, 5, 0, 1);
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .........L
       .......LLL`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("L shape cannot be kicked if center column taken - 1", () => {
    move(board, 5, 0, 1);
    board.setRowColTaken(5, 8);
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .......LLL
       .......LX.`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("L shape cannot be kicked if center column taken - 2", () => {
    move(board, 5, 0, 1);
    board.setRowColTaken(3, 8);
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ........X.
       .......LLL
       .......L..`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("L shape cannot be kicked if center column taken - 3", () => {
    board.rotate("right");
    board.rotate("right");
    move(board, 5, 0, 1);
    board.setRowColTaken(3, 8);
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ........X.
       .........L
       .......LLL`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("L shape cannot be kicked if center column taken - 4", () => {
    board.rotate("right");
    board.rotate("right");
    move(board, 5, 0, 1);
    board.setRowColTaken(4, 8);
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ........XL
       .......LLL`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("L shape can be kicked if off center columns taken", () => {
    move(board, 5, 0, -1);
    board.setRowColTaken(3, 0);
    board.setRowColTaken(5, 1);
    board.rotate("right");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       XLL.......
       ..L.......
       .XL.......`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });

  it("L shape can be kicked if off center columns taken", () => {
    board.rotate("right");
    board.rotate("right");
    move(board, 5, 0, 1);
    board.setRowColTaken(3, 7);
    board.setRowColTaken(4, 8);
    board.rotate("left");

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .......XLL
       ........XL
       .........L`
    );
    expect(board.hasFalling(), "Player can rotate falling tetromino").to.be
      .true;
  });
});
