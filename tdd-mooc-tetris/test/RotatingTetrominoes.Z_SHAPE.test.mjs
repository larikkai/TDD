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

describe("The T shape", () => {
  const shape = Tetromino.Z_SHAPE;

  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       ZZ..
       .ZZ.
       ....`
    );
  });

  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..Z.
       .ZZ.
       .Z..
       ....`
    );
  });

  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..Z.
       .ZZ.
       .Z..
       ....`
    );
  });

  it("can be rotated twice left/counter-clockwise", () => {
    expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(
      `....
       ZZ..
       .ZZ.
       ....`
    );
  });

  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});
