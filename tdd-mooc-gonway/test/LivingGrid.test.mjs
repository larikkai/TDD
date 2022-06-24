import { expect } from "chai";
import { Grid } from "../src/Grid.mjs";

describe("The grid to enables life", () => {
  let grid;
  beforeEach(() => {
    grid = new Grid(3, 3);
  });

  it("The grid starts empty", () => {
    expect(grid.toString()).to.equal("bbb$bbb$bbb!");
  });
});
