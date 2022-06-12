import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctItems(bag) {
  const distinct = new Set();
  for (let i = 0; i < 10; i++) {
    distinct.add(bag.getNext());
  }
  return distinct;
}

describe("Shuffle bag is not too random", () => {
  const bag = new ShuffleBag(Tetromino.I_SHAPE);

  it("Bag with one item returns one distinct item", () => {
    expect(distinctItems(bag).size).to.equal(1);
  });

  it("Bag with two items return two distinct items", () => {
    bag.addItem(Tetromino.T_SHAPE);
    expect(distinctItems(bag).size).to.equal(2);
  });

  it("Bag with three items return three distinct items", () => {
    bag.addItem(Tetromino.L_SHAPE);
    expect(distinctItems(bag).size).to.equal(3);
  });

  it("Bag with four items return four distinct items", () => {
    bag.addItem(Tetromino.J_SHAPE);
    expect(distinctItems(bag).size).to.equal(4);
  });

  it("Bag with five items return five distinct items", () => {
    bag.addItem(Tetromino.Z_SHAPE);
    expect(distinctItems(bag).size).to.equal(5);
  });

  it("Bag with six items return six distinct items", () => {
    bag.addItem(Tetromino.S_SHAPE);
    expect(distinctItems(bag).size).to.equal(6);
  });

  it("Bag with seven items return seven distinct items", () => {
    bag.addItem(Tetromino.O_SHAPE);
    expect(distinctItems(bag).size).to.equal(7);
  });
});
