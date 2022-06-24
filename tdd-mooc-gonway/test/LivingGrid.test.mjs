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

describe("There is life!", () => {
  let grid;

  it("Blinker lives with one iteration", () => {
    let iterations = 1;
    const grid = new Grid("bbb$ooo$bbb!", 3, iterations);
    expect(grid.toString()).to.equal("bob$bob$bob!");
  });
  
  it("Blinker lives with two iteration", () => {
    let iterations = 2;
    const grid = new Grid("bbb$ooo$bbb!", 3, iterations);
    expect(grid.toString()).to.equal("bbb$ooo$bbb!");
  });

  it("Blinker has two distinct shapes", () => {
    const shape = "bbb$ooo$bbb!";
    expect(distinct(shape, 3)).to.equal(2);
  });
});
