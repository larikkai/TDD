import { expect } from "chai";
import { Grid } from "../src/Grid.mjs";

function distinct(s, n) {
  const distinct = new Set();
  for (let i = 0; i < 20; i++) {
    const shape = new Grid(s, n, i);
    distinct.add(shape.toString());
  }
  return distinct.size;
}

describe("Spaceship lifes!", () => {
  let grid;

  xit("Glider shape changes when iterating", () => {
    let iterations = 1;
    const grid = new Grid("bbbbb$bbbob$bobob$bboob$bbbbb!", 5, iterations);
    expect(grid.toString()).to.equal("bbbbb$bbobb$bbboo$bboob$bbbbb!");
  });
});
