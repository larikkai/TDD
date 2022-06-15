import { expect } from "chai";
import { sum, multiplyByNine } from "../src/example.mjs";
import * as fs from "fs";

function getResults(path, number, date) {
  const distinct = new Set();
  for (let i = 0; i < 10; i++) {
    distinct.add(multiplyByNine(path, number, date));
  }
  return [...distinct].every((result) => {
    return result % 9 === 0;
  });
}

function getFileStats(path) {
  fs.stat(path, (err, stat) => {});
}

describe("Example test fixture", () => {
  const path = "./test/temp.txt";

  after(() => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  });

  it("Example test", () => {
    expect(sum(1, 2)).to.equal(3);
  });

  it("Result is written to file", () => {
    multiplyByNine(path, 2, new Date());
    expect(getFileStats(path)).not.to.throw;
  });

  it("Result 0 or multiplied by 9", () => {
    const result = getResults(path, 2, new Date());
    expect(result).to.be.true;
  });
});
