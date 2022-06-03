import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { B } from "../src/Board2.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { Tet } from "../src/Tetromino2.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("new tetro", () => {
    it("o_shape2", () => {
        const shape = Tet.O_SHAPE;
        
        expect(shape.toString()).to.equalShape(
          `.OO.
           .OO.
           ....`
        );
      });

    it("i_shape2", () => {
        const shape = Tet.I_SHAPE;
        
        expect(shape.toString()).to.equalShape(
          `IIII
           ....
           ....`
        );
    });
  });

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new B(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tet.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(Tet.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tet.T_SHAPE);
    fallToBottom(board);
    board.drop(Tet.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });
});
