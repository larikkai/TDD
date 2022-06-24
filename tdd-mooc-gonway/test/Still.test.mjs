import { expect } from "chai";
import { Grid } from "../src/Grid.mjs";

function distinct(s, n) {
  const distinct = new Set();
  for (let i = 0; i < 10; i++) {
    const shape = new Grid(s, n, i);
    distinct.add(shape.toString());
  }
  return distinct.size;
}

describe("Still lifes!", () => {
  let grid;

  it("Block shape does not change when iterating", () => {
    let iterations = 1;
    const grid = new Grid("bbbb$boob$boob$bbbb!", 4, iterations);
    expect(grid.toString()).to.equal("bbbb$boob$boob$bbbb!");
  });

  it("Blinker has one distinct shape", () => {
    const shape = "bbbb$boob$boob$bbbb!";
    expect(distinct(shape, 4)).to.equal(1);
  });
});
