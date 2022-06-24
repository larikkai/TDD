import { expect } from "chai";
import { Grid } from "../src/Grid.mjs";
import { Shape } from "../src/Shape.mjs";

describe("The grid to enables life", () => {
  let grid;

  it("The grid starts empty", () => {
    let iterations = 1;
    const grid = new Grid("bbb$ooo$bbb!", 3, iterations);
    expect(grid.toString()).to.equal("bob$bob$bob!");
  });
});
