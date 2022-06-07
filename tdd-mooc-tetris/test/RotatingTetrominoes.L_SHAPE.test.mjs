import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The L shape", () => {
  const shape = Tetromino.L_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       LLL.
       L...
       ....`
    );
  });

  xit("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `LL..
       .L..
       .L..
       ....`
    );
  });

  xit("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.L..
       .L..
       .LL.
       ....`
    );
  });

  xit("can be rotated twice left/counter-clockwise", () => {
    expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(
      `....
       ..L.
       LLL.
       ....`
    );
  });

  xit("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});
