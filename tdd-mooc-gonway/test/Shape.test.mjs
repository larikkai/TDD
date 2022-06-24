import { expect } from "chai";
import { Shape } from "../src/Shape.mjs";

describe("Shapes from input string", () => {
  let shape;
  it("Empty shape can be created", () => {
    shape = new Shape();
    expect(shape.toString()).to.equal("");
  });
});
