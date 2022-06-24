import { expect } from "chai";
import { Shape } from "../src/Shape.mjs";

describe("Shapes from input string", () => {
  let shape;
  it("Empty shape can be created", () => {
    shape = new Shape();
    expect(shape.toString()).to.equal("");
  });

  it("Correct coordinates from input string", () => {
    shape = new Shape("bob$bob$bob!");
    expect(shape.getCoordinates().toString()).to.equal("1,4,7");
  });
});
