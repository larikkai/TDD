import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { State } from "../src/State.mjs";
import { update_state_event } from "../src/StateListener.mjs";

function tick(board, n) {
  for (let i = 0; i < n; i++) {
    board.tick();
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

describe("Scoring possible", () => {
  let board;
  let state;
  beforeEach(() => {
    state = new State();
    board = new Board(6, 4, state);
    board.events.subscribe("update_score", update_state_event);
    fill(board, 3, 0, 1);
    fill(board, 3, 3, 5);
  });

  it("Score is 0 at start", () => {
    expect(state.score, "Score should be zero at start").to.equal(0);
  });

  it("One line clear - increases score", () => {
    fill(board, 2, 0, 0);
    fill(board, 2, 5, 5);
    board.drop(Tetromino.I_SHAPE);
    tick(board, 3);
    expect(state.score, "Score increaces after line clear").to.equal(1);
  });

  it("Two line clear - increases score more than one line clear", () => {
    fill(board, 2, 0, 0);
    fill(board, 2, 4, 5);
    board.drop(Tetromino.T_SHAPE);
    tick(board, 3);
    expect(state.score, "Score increaces after two line clear").to.equal(48);
  });

  it("Three line clear - increases score more than two line clear", () => {
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
    expect(state.score, "Score increases after three line clear").to.equal(30);
  });

  it("Four line clear - increases score mote than three line clear", () => {
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
    expect(state.score, "Score increases after four line clear").to.equal(336);
  });
});
